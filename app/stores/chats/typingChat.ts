import axios from "axios";
import { BASE_URL } from "~/env/requests.env";
import { useAuthStore } from "~/stores/auth";


//для установления статуса печатает...
const typingChats = async () => {
    const authStore = useAuthStore()
    try{
        const response = await axios.post(`${BASE_URL}/chats/typing`, {}, {
            headers: {
                'Authorization': `Bearer ${authStore.accessToken}`
            }
        })
        return { success: true, data: response.data }
    }
    catch(error){ {
        return { success: false, error: error }

    }
}
}   