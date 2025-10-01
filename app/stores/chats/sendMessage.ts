import axios from 'axios'
import { useAuthStore } from '~/stores/auth'
import { BASE_URL } from '~/env/requests.env'

export const sendMessage = async (chatId: string, text: string) => {
  const authStore = useAuthStore()
  
  console.log(chatId, text)
  try {
    const response = await axios.post(
      `${BASE_URL}/chats/${chatId}/messages`,
      { text },
      {
        headers: {
          'Authorization': `Bearer ${authStore.accessToken}`
        }
      }
    )

    return { success: true, data: response.data }
  } catch (error) {
    return { success: false, error: error }
  }
}