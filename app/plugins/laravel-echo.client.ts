import Echo from 'laravel-echo'
import Pusher from 'pusher-js'
import {
    WS_CONNECTION,
    REVERB_HOST,
    REVERB_APP_KEY,
} from '~/env/reverb.env'


declare global {
    interface Window {
        Pusher: typeof Pusher
        Echo: Echo<any>
    }
}


export default defineNuxtPlugin(() => {

    console.log( 'loading: laravel-echo.client' )

    window.Pusher = Pusher

    const echo = new Echo({
        broadcaster: WS_CONNECTION,
        key: REVERB_APP_KEY,
        wsHost: REVERB_HOST,
        wsPort: 80,
        cluster: 'mt1',
        forceTLS: false,
        enabledTransports: ['ws', 'wss'],
    })

    window.Echo = echo

    return {
        provide: {
            echo
        }
    }
})
