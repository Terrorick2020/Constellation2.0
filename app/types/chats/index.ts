export interface IChat {
  id: string
  userId: string // для преехода их сообщения на профиль
  avatar: string
  label: string
  lastMessage: string
  lastTime: number //добавил для listItem
  unread: number
  pinned: boolean
  verified: boolean
  archived?: boolean // для архива
  muted: boolean
  me: boolean
  type: 'message' | 'document'
}

export type TChatFilterTabKeys = 'all' | 'unread' | 'pinned' | 'discussion'
export interface IChatFilterTab {
  label: string
  key: TChatFilterTabKeys
}

export interface IChatInjects {
  closeChat: () => void
}




/**
 * Тип сообщения в чате
 */
export interface IMessage {
  id: string
  text: string
  fromUserId: string
  timestamp: number
  isRead: boolean
}

