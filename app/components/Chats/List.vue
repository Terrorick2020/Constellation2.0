<template>
  <section class="h-full min-w-full lg:min-w-[350px] lg:border-r">
    <!-- search + backet -->
    <ChatsHeader v-model="inputSearch" />

    <!-- tabs + chats -->
    <div ref="chatsContainer" class="flex h-[calc(100%-4rem)] flex-col">
      <!-- tab list -->
      <ChatsTabs :filter-key="filterKey" @select="changeKey" />

      <!-- chat list -->
      <el-scrollbar view-class="flex flex-col">
        <ChatsListItem v-for="chat in chatsFiltred" :key="chat.id" :chat @select="selectChat" />
      </el-scrollbar>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { IChat, IChatFilterTab, TChatFilterTabKeys } from '~/types/chats'

interface Props {
  chats: IChat[]
}

const props = defineProps<Props>()
const emit = defineEmits(['selectChat'])
const inputSearch = defineModel({ type: String })

const filterKey = ref<TChatFilterTabKeys>('all')
const changeKey = (key: TChatFilterTabKeys) => (filterKey.value = key)
const chatsFiltred = computed(() => {
  return props.chats.filter((i) => {
    if (filterKey.value === 'all') {
      return props.chats
    } else if (filterKey.value === 'unread') {
      return i.unread !== 0
    } else if (filterKey.value === 'pinned') {
      return i.pinned
    } else if (filterKey.value === 'discussion') {
      return true
    }
  })
})

const selectChat = (chat: IChat) => {
  emit('selectChat', chat)
}
</script>
