import { defineStore } from 'pinia'

const STORAGE_KEY = 'pinned-chats'

export const usePinnedChatsStore = defineStore('pinnedChats', {
  state: () => ({
    _initialized: false,
    pinnedIds: [] as string[]
  }),

  actions: {
    _loadFromStorage() {
      if (this._initialized || process.server) return
      try {
        const raw = localStorage.getItem(STORAGE_KEY)
        if (raw) {
          const parsed = JSON.parse(raw)
          if (Array.isArray(parsed)) {
            this.pinnedIds = parsed.map(String)
          }
        }
      } catch (e) {
        this.pinnedIds = []
      }
      this._initialized = true
    },

    togglePin(chatId: string | number) {
      if (process.server) return
      this._loadFromStorage() 
      const id = String(chatId)
      const index = this.pinnedIds.indexOf(id)
      if (index === -1) {
        this.pinnedIds.push(id)
      } else {
        this.pinnedIds.splice(index, 1)
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.pinnedIds))
    },

    isPinned(chatId: string | number): boolean {
      this._loadFromStorage() 
      return this.pinnedIds.includes(String(chatId))
    }
  }
})