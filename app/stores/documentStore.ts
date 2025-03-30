// store/documentStore.ts
import { defineStore } from 'pinia'

export const useDocumentStore = defineStore('document', {
  state: () => ({
    documentName: ''
  }),
  actions: {
    setDocumentName(name: string) {
      this.documentName = name
    }
  }
})
