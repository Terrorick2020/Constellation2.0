<template>
  <section class="h-full min-w-full lg:min-w-[350px] lg:border-r">
    <ChatsHeader ref="headerRef" />

    <div ref="chatsContainer" class="flex h-[calc(100%-4rem)] flex-col">
      <ChatsTabs :filter-key="filterKey" @select="changeKey" />

      <el-scrollbar view-class="flex flex-col">
        <ChatsListItem
          v-for="chat in filteredAndSortedChats"
          :key="chat.id"
          :chat="chat"
          @select="selectChat"
        />
      </el-scrollbar>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { IChat, TChatFilterTabKeys } from '~/types/chats'
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { usePinnedChatsStore } from '~/stores/chats/pinned'
import { useArchivedChatsStore } from '~/stores/chats/archive' 

interface Props {
  chats: IChat[]
}

const props = defineProps<Props>()
const emit = defineEmits(['selectChat'])
const headerRef = ref()

const searchQuery = ref('')

const isShowArchive = computed(() => {
  return headerRef.value?.isShowArchive || false
})

let searchInput: HTMLInputElement | null = null

const handleInput = () => {
  if (searchInput) {
    searchQuery.value = searchInput.value
  }
}

onMounted(() => {
  searchInput = document.querySelector('input[placeholder="Поиск по названию и др..."]')
  if (searchInput) {
    searchInput.addEventListener('input', handleInput)
  }
})

onUnmounted(() => {
  if (searchInput) {
    searchInput.removeEventListener('input', handleInput)
  }
})

const filteredAndSortedChats = computed(() => {
  let chats = [...props.chats]

  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase()
    chats = chats.filter(chat => chat.label?.toLowerCase().includes(q))
  }

  const archiveStore = useArchivedChatsStore()
  if (isShowArchive.value) {
    chats = chats.filter(chat => archiveStore.isArchived(chat.id))
  } else {
    chats = chats.filter(chat => !archiveStore.isArchived(chat.id))
  }

  const pinnedStore = usePinnedChatsStore()
  if (filterKey.value === 'unread') {
    chats = chats.filter(c => c.unread !== 0)
  } else if (filterKey.value === 'pinned') {
    chats = chats.filter(c => pinnedStore.isPinned(c.id))
  }

 
  return chats.sort((a, b) => {
    const aPinned = pinnedStore.isPinned(a.id) ? 1 : 0
    const bPinned = pinnedStore.isPinned(b.id) ? 1 : 0

    if (aPinned === bPinned) {
      return b.lastTime - a.lastTime 
    }

    return bPinned - aPinned 
  })
})

const filterKey = ref<TChatFilterTabKeys>('all')
const changeKey = (key: TChatFilterTabKeys) => (filterKey.value = key)

const selectChat = (chat: IChat) => {
  emit('selectChat', chat)
}
</script>