// stores/chats/archive.ts
import { defineStore } from 'pinia'
import type { IChat } from '~/types/chats'




export const useArchivedChatsStore = defineStore('archivedChats', {
  actions: {
    toggleArchive(chat: IChat) {
      chat.archived = !chat.archived
      console.log(`Чат "${chat.label}" ${chat.archived ? 'архивирован' : 'восстановлен'}`)
    }
  }
})



