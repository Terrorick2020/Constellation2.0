import { defineStore } from 'pinia'

const STORAGE_KEY = 'archived-chats'

export const useArchivedChatsStore = defineStore('archivedChats', {
  state: () => ({
    _initialized: false,
    archivedIds: [] as string[]
  }),

  actions: {
    _loadFromStorage() {
      if (this._initialized || process.server) return
      try {
        const raw = localStorage.getItem(STORAGE_KEY)
        if (raw) {
          const parsed = JSON.parse(raw)
          if (Array.isArray(parsed)) {
            this.archivedIds = parsed.map(String)
          }
        }
      } catch (e) {
        this.archivedIds = []
      }
      this._initialized = true
    },

    toggleArchive(chatId: string | number) {
      if (process.server) return
      this._loadFromStorage()
      const id = String(chatId)
      const index = this.archivedIds.indexOf(id)
      if (index === -1) {
        this.archivedIds.push(id)
      } else {
        this.archivedIds.splice(index, 1)
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.archivedIds))
    },

    isArchived(chatId: string | number): boolean {
      this._loadFromStorage() 
      return this.archivedIds.includes(String(chatId))
    }
  }
})