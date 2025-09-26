import { ref } from 'vue'
import axios from 'axios'
import type { IChat } from '~/types/chats'
import { BASE_URL } from '~/env/requests.env'
import { useAuthStore } from '~/stores/auth' 
import DefaultAvatar from '~/assets/image/avatar.jpg'


interface ChatItemRes {
  chatId: string
  toUser: {
    id: string
    name: string
    username: string
    division: string
    job: string
    avatar: string

  }
  lastMsg: string
  unread_count: number
  created_at: number 
}


const CHATS_ENDPOINT = `${BASE_URL}/chats`

export const useChats = () => {
  const chats = ref<IChat[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchChats = async () => {
    loading.value = true
    error.value = null

    try {
      const { accessToken } = useAuthStore()

      if (!accessToken) {
        throw new Error('Токен авторизации отсутствует')
      }

      const response = await axios.get<ChatItemRes[]>(CHATS_ENDPOINT, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      })

      console.log('📥 Получение списка чатов:', response.data)
      

      const sortedData = response.data
        .slice()
        .sort((a, b) => {
          if (b.unread_count !== a.unread_count) {
            return b.unread_count - a.unread_count
          }
          return a.created_at - b.created_at
        })

      const mappedChats: IChat[] = sortedData.map(item => {
        const isDocument = item.lastMsg?.match(/\.(pdf|docx?|xlsx?|jpg|jpeg|png|gif|mp4|mov)$/i)
        const type: 'message' | 'document' = isDocument ? 'document' : 'message'

        const displayName = item.toUser.name === 'Не задано' 
          ? item.toUser.username 
          : item.toUser.name

        return {
          // id: hashStringToNumber(item.chatId), 
          id: item.chatId, 
          userId: item.toUser.id,
          avatar: item.toUser.avatar || DefaultAvatar,
          label: displayName,
          lastMessage: item.lastMsg || 'Сообщений пока нет! Начните общение первым(ой)',
          lastTime: item.created_at, // Время отправки последнего сообщения
          unread: item.unread_count,
          pinned: false,
          verified: false,
          muted: false,
          me: false,
          type
        }
      })

      mappedChats.sort((a, b) => b.unread - a.unread)
      chats.value = mappedChats
      return mappedChats

    } catch (err: any) {
      error.value = err.message || 'Не удалось загрузить чаты'
      console.error('fetchChats error:', err)
      return []
    } finally {
      loading.value = false
    }
  }

  return {
    chats,
    loading,
    error,
    fetchChats
  }
}