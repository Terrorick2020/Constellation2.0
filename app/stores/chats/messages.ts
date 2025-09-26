import { defineStore } from 'pinia'

export interface ChatMessage {
  id?: string
  text: string
  sender: boolean
  timestamp: number
  file?: {
    media_url: string
    media_type: string
    fileName?: string
  }
}

export const useChatMessagesStore = defineStore('chatMessages', {
  state: () => ({
    messages: [] as ChatMessage[]
  }),

  getters: {
    sortedMessages: (state) => {
      return [...state.messages].sort((a, b) => a.timestamp - b.timestamp)
    }
  },

  actions: {
    addMessage(text: string, sender: boolean, timestamp: number, file?: ChatMessage['file']) {
      this.messages.push({
        id: Date.now().toString(),
        text,
        sender,
        timestamp,
        file
      })
    },

    setMessages(messages: ChatMessage[]) {
      this.messages = messages
    },

    clear() {
      this.messages = []
    }
  }
})