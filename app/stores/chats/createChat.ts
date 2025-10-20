// stores/chat.ts
import { defineStore } from 'pinia'
import axios from 'axios'
import { ElMessage } from 'element-plus'
import { useAuthStore } from '~/stores/auth'
import { BASE_URL } from '~/env/requests.env'

export const useChatStore = defineStore('chat', {
  state: () => ({
    creating: false
  }),

  actions: {
    async createChat(userId: string) {
      this.creating = true

      try {
        const authStore = useAuthStore()

        if (!authStore.accessToken) {
          throw new Error('Пользователь не авторизован')
        }
        console.log('Создание чата для:', userId)
        const response = await axios.post(`${BASE_URL}/chats`, {
          toUser: userId 
        }, {
          headers: {
            // 'Content-Type': 'application/json',
            'Authorization': `Bearer ${authStore.accessToken}`  
          }
        })

        console.log('Чат создан:', response.data)

        ElMessage.success('Чат создан!')

        // Возвращаем chatId для редиректа
        return response.data?.chatId || response.data?.data?.chatId

      } catch (error: any) {
        console.error('Ошибка создания чата:', error)
        ElMessage.error('Не удалось создать чат')
        throw error
      } finally {
        this.creating = false
      }
    }
  }
})