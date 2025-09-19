// import { ref } from 'vue'
// import axios from 'axios'
// import type { IChat } from '~/types/chats'
// import { BASE_URL } from '~/env/requests.env'
// import { useAuthStore } from '~/stores/auth' 

// interface ChatItemRes {
//   chatId: number
//   toUser: {
//     avatarUrl: string
//     name: string
//     age: number
//   }
//   lastMsg: string | null
//   unread_count: number
//   created_at: number 
// }

// interface FetchResponse<T> {
//   success: boolean
//   data: T | 'None'
// }

// const CHATS_ENDPOINT = `${BASE_URL}/chats`

// export const useChats = () => {
//   const chats = ref<IChat[]>([])
//   const loading = ref(false)
//   const error = ref<string | null>(null)

//   const fetchChats = async () => {
//     loading.value = true
//     error.value = null

//     try {
//       const { accessToken } = useAuthStore()

//       if (!accessToken) {
//         throw new Error('Токен авторизации отсутствует')
//       }

//       const response = await axios.get<FetchResponse<ChatItemRes[]>>(CHATS_ENDPOINT, {
//         headers: {
//           'Authorization': `Bearer ${accessToken}`
//         }
//       })

//       console.log('Получение списка чатов', response)

//       if (
//         response.status !== 200 ||
//         !response.data.success ||
//         !response.data.data ||
//         response.data.data === 'None'
//       ) {
//         throw new Error('Invalid or empty response from server')
//       }

//       const now = Date.now()

//       const sortedData = response.data.data
//         .slice()
//         .sort((a, b) => {
//           if (b.unread_count !== a.unread_count) {
//             return b.unread_count - a.unread_count
//           }
//           return a.created_at - b.created_at
//         })

//       const mappedChats: IChat[] = sortedData.map(item => {
//         const isDocument = item.lastMsg?.match(/\.(pdf|docx?|xlsx?|jpg|jpeg|png|gif|mp4|mov)$/i)
//         const type: 'message' | 'document' = isDocument ? 'document' : 'message'

//         return {
//           id: item.chatId,
//           avatar: item.toUser.avatarUrl,
//           label: `${item.toUser.name}, ${item.toUser.age}`,
//           lastMessage: item.lastMsg || 'Сообщений пока нет! Начните общение первым(ой)',
//           unread: item.unread_count,
//           pinned: false,
//           verified: false,
//           muted: false,
//           me: false,
//           type
//         }
//       })

//       mappedChats.sort((a, b) => b.unread - a.unread)

//       chats.value = mappedChats
//       return mappedChats

//     } catch (err: any) {
//       error.value = err.message || 'Не удалось загрузить чаты'
//       console.error('fetchChats error:', err)
//       return []
//     } finally {
//       loading.value = false
//     }
//   }

//   return {
//     chats,
//     loading,
//     error,
//     fetchChats
//   }
// }



// stores/getChats.ts
import { ref } from 'vue'
import axios from 'axios'
import type { IChat } from '~/types/chats'
import { BASE_URL } from '~/env/requests.env'
import { useAuthStore } from '~/stores/auth' 
import DefaultAvatar from '~/assets/image/avatar.jpg'

// ✅ Преобразует строку (UUID) в уникальное число
const hashStringToNumber = (str: string): number => {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash // Convert to 32-bit integer
  }
  return Math.abs(hash)
}

interface ChatItemRes {
  chatId: string
  toUser: {
    id: string
    name: string
    username: string
    division: string
    job: string
  }
  lastMsg: string
  unread_count: number
  created_at: number 
}

// ❌ УБРАЛИ FetchResponse — сервер возвращает массив напрямую
// interface FetchResponse<T> {
//   success: boolean
//    T | 'None'
// }

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

      // ✅ Убрали дженерик FetchResponse — сервер возвращает ChatItemRes[] напрямую
      const response = await axios.get<ChatItemRes[]>(CHATS_ENDPOINT, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      })

      console.log('📥 Получение списка чатов:', response.data)

      // ✅ УБРАЛИ всю проверку на success/data/None — работаем напрямую с массивом
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
          id: hashStringToNumber(item.chatId), // ✅ UUID → number
          avatar: DefaultAvatar,
          label: displayName,
          lastMessage: item.lastMsg || 'Сообщений пока нет! Начните общение первым(ой)',
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