// stores/chats/sendFile.ts
import axios from 'axios'
import { useAuthStore } from '~/stores/auth'
import { BASE_URL } from '~/env/requests.env'

export const sendFileMessage = async (
  chatId: string,
  file: File,
  text: string
) => {
  const authStore = useAuthStore()

  const formData = new FormData()
  formData.append('file', file)
  if (text) {
    formData.append('text', text)
  }

  try {
    const response = await axios.post(
      `${BASE_URL}/chats/${chatId}/files`,
      // formData,
      {
        headers: {
          'Authorization': `Bearer ${authStore.accessToken}`,
          'Content-Type': 'multipart/form-data'
        }
      }
    )
    return { success: true,  data: response.data }
  } catch (error) {
    return { success: false, error: error }
  }
}