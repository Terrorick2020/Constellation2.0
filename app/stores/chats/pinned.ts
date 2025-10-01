// stores/chats/pinned.ts
import { defineStore } from 'pinia'
import type { IChat } from '~/types/chats'

export const usePinnedChatsStore = defineStore('pinnedChats', {
  actions: {
    togglePin(chat: IChat) {
      chat.pinned = !chat.pinned
    }
  }
})