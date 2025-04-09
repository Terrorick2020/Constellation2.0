import { io, Socket } from 'socket.io-client'

export default defineNuxtPlugin(() => {
  const socket: Socket = io('http://localhost', {
    path: '/socket.io',
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
