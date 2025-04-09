import axios from 'axios';
import { useAuthStore } from '#imports';
import { BASE_URL } from '~/env/requests.env';


export default defineNuxtRouteMiddleware(async (to, from) => {

    const authStore = useAuthStore()

    if ( !authStore.accessToken || !authStore.userId ) {
        return navigateTo('/auth/sign-in')
    }

    const voidRoutes = [
        'auth/sign-in',
        'auth/sign-up',
        'auth/reset-pass',
        'preview',
        'preview/privacy',
        'preview/rules'
    ]

    if ( !voidRoutes.includes( to.path ) ) {

        try {
            const response = await axios.get(
                `${BASE_URL}/user/${authStore.userId}`,
                {
                    headers: {
                        Authorization: `Bearer ${authStore.accessToken}`,
                    }
                }
            )
    
            if ( response.status !== 200 ) {
                return navigateTo('/auth/sign-in')
            }

            authStore.userId = response.data.id
            authStore.isAdmin = response.data.role === 'Admin'
            authStore.username = response.data.username

            return

        } catch ( error ) {
            return navigateTo('/auth/sign-in')
        }
    }

    return
})
