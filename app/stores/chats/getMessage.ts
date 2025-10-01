// stores/chats/getMessage.ts
import axios from 'axios'
import { BASE_URL } from '~/env/requests.env'
import { useAuthStore } from '~/stores/auth'

export const getMessages = async (chatId: string) => {
  const authStore = useAuthStore()
  console.log("Тут все хорошо")
  try {
    const response = await axios.get(
      `${BASE_URL}/chats/${chatId}/messages`,
      {
        headers: {
          Authorization: `Bearer ${authStore.accessToken}`
        }
      }
    )
    console.log("Получение сообщении", response.data)
    return { success: true, data: response.data }
  } catch (error) {
    return { success: false, error: error }
  }
}