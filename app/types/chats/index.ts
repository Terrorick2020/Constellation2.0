export interface IChat {
  id: number
  avatar: string
  label: string
  lastMessage: string
  unread: number
  pinned: boolean
  verified: boolean
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
