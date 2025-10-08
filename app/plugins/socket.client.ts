import { io, Socket } from 'socket.io-client'
import { useAuthStore } from '~/stores/auth'

export default defineNuxtPlugin((nuxtApp) => {
  const authStore = useAuthStore()
  const token = authStore.accessToken

  const socket: Socket = io('http://78.24.221.66', {
    path: '/socket.io',
    transports: ['websocket'],
    withCredentials: true,
    auth: {
      token: token || '' 
    }
  })
  
  // const socket: Socket = io('http://localhost:7000', {
  //   path: '/socket.io',
  //   transports: ['websocket'],
  //   withCredentials: true,
  //   auth: {
  //     token: token || '' 
  //   }
  // })

  socket.on('connect', () => {
    console.log('✅ WebSocket подключен. ID:', socket.id)
  })

  socket.on('disconnect', () => {
    console.log('❌ WebSocket отключен')
  })

  socket.on('connect_error', (err) => {
    console.error('🔌 Ошибка подключения WebSocket:', err)
  })

  return {
    provide: {
      socket
    }
  }
})




