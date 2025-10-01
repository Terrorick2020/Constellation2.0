import axios from 'axios'
import { useAuthStore } from '~/stores/auth'
import { BASE_URL } from '~/env/requests.env'




export const readMessages = async  (chatId : string) => {
    const authStore = useAuthStore ()

    console.log("ChatId для прочтения сообщений", chatId)
    try{
        const result = axios.put(
            `${BASE_URL}/chats/${chatId}/read`,
            {},
            {
                headers: {
                    'Authorization': `Bearer ${authStore.accessToken}`
                }
            }
        )
    }

    catch (error){
        return { success: false, error: error }

    }

}