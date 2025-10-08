import { io, Socket } from 'socket.io-client'
import { useAuthStore } from '~/stores/auth'

const WS_URL = 'http://78.24.221.66'
// const WS_URL = 'http://localhost:7000'

let socket: Socket | null = null

const getOrCreateSocket = async (): Promise<Socket> => {
  if (socket?.connected) {
    return socket
  }

  const authStore = useAuthStore()
  const userId = authStore.userId?.toString()
  if (!userId) {
    throw new Error('Пользователь не авторизован')
  }

  socket = io(WS_URL, {
    auth: { userId },
    transports: ['websocket'],
  })

  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      reject(new Error('Подключение к WebSocket не удалось: таймаут'))
    }, 5000)

    socket!.once('connect', () => {
      clearTimeout(timeout)
      resolve(socket!)
    })

    socket!.once('connect_error', (err) => {
      clearTimeout(timeout)
      reject(err)
    })
  })
}

export const joinChatRoom = async (chatId: string): Promise<void> => {
  const s = await getOrCreateSocket()
  s.emit('join-chat', chatId)
}

export const subscribeToNewMessage = (
  callback: (message: any) => void
): (() => void) => {
  if (!socket) {
    console.warn('Socket не инициализирован. Подпишитесь после joinChatRoom.')
    return () => {}
  }

  socket.on('new-message', callback)
  return () => {
    socket?.off('new-message', callback)
  }
}

export const sendMessage = async (
  chatId: string,
  text: string
): Promise<void> => {
  const s = await getOrCreateSocket()
  s.emit('send-message', { chatId, message: { text } })
}




export const getSocket = (): Socket | null => socket