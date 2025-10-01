import axios from "axios";
import { BASE_URL } from "~/env/requests.env";
import { useAuthStore } from "~/stores/auth";




export const getMetadata = async (chatId: string) => {
  const authStore = useAuthStore()

  try {
    const response = await axios.get(
      `${BASE_URL}/chats/${chatId}/metadata`,

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