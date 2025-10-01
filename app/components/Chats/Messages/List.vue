<template>
  <el-scrollbar ref="scrollbarRef" wrap-class="!scroll-smooth" class="flex-1">
    <div ref="listRef" class="relative flex flex-col p-5">
      <ChatsMessagesListItemTimeStep />

      <ChatsMessagesListItem
        v-for="(mess, idx) in displayedMessages"
        :key="mess.id"
        :sender="mess.sender"
        :text="mess.text"
        :timestamp="mess.timestamp"
        :file="mess.file"
        @reply="$emit('reply', $event)"
        :class="getMessageClass(mess, idx)"
      />

      <ChatsMessagesListItemSystem />
    </div>
  </el-scrollbar>
</template>

<script setup lang="ts">
import { ref, computed, nextTick, watch } from 'vue'
import type { ElScrollbar } from 'element-plus'
import { useChatMessagesStore } from '~/stores/chats/messages'

const props = defineProps<{
  searchQuery?: string
}>()

const chatMessagesStore = useChatMessagesStore()
const sortedMessages = computed(() => chatMessagesStore.sortedMessages)

const displayedMessages = computed(() => {
  if (!props.searchQuery?.trim()) return sortedMessages.value

  const q = props.searchQuery.toLowerCase()
  return sortedMessages.value.filter(msg =>
    msg.text.toLowerCase().includes(q)
  )
})

const scrollbarRef = ref<InstanceType<typeof ElScrollbar>>()
const listRef = ref<HTMLElement | null>(null)

const getMessageClass = (message: any, index: number) => {
  const isLastInGroup = !displayedMessages.value[index + 1] || displayedMessages.value[index + 1].sender !== message.sender
  return isLastInGroup ? 'mb-4' : 'mb-[10px]'
}

const scrollToLastMessage = () => {
  if (!listRef.value || !scrollbarRef.value) return
  nextTick(() => {
    setTimeout(() => {
      if (listRef.value && scrollbarRef.value) {
        scrollbarRef.value.setScrollTop(listRef.value.scrollHeight)
      }
    }, 100)
  })
}

watch(
  () => displayedMessages.value.length,
  () => {
    scrollToLastMessage()
  },
  { immediate: true }
)
</script>