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
    chats = chats.filter(chat => chat.label.toLowerCase().includes(q))
  }

  if (isShowArchive.value) {
    chats = chats.filter(chat => chat.archived)
  } else {
    chats = chats.filter(chat => !chat.archived)
  }

  if (filterKey.value === 'unread') chats = chats.filter(c => c.unread !== 0)
  if (filterKey.value === 'pinned') chats = chats.filter(c => c.pinned)
  if (filterKey.value === 'discussion') chats = chats

  return chats.sort((a, b) => {
    if (a.pinned !== b.pinned) return a.pinned ? -1 : 1
    return b.lastTime - a.lastTime
  })
})

const filterKey = ref<TChatFilterTabKeys>('all')
const changeKey = (key: TChatFilterTabKeys) => (filterKey.value = key)

const selectChat = (chat: IChat) => {
  emit('selectChat', chat)
}
</script>