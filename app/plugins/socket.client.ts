import { io, Socket } from 'socket.io-client'

export default defineNuxtPlugin(() => {
  const socket: Socket = io('http://localhost:4200', {
    // path: '/socket.io',
    path: '/',
    transports: ['websocket'],
    withCredentials: true,
  })

  console.log("Подключение к socket.io")

  return {
    provide: {
      socket,
    },
  }
})
