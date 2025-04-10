import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSignStore = defineStore('signStore', () => {
  const documentStatuses = ref<Record<string, 'success' | 'failed'>>({})

  const setDocumentStatus = (docId: string, status: 'success' | 'failed') => {
    documentStatuses.value[docId] = status
  }

  const getDocumentStatus = (docId: string) => {
    return documentStatuses.value[docId] || 'failed'
  }

  return {
    documentStatuses,
    setDocumentStatus,
    getDocumentStatus
  }
})
