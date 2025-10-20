<template>
  <el-scrollbar ref="scrollbarRef" wrap-class="!scroll-smooth" class="flex-1">
    <div ref="listRef" class="relative flex flex-col p-5">
      <template v-for="(mess, idx) in displayedMessages" :key="mess.id">
        <ChatsMessagesListItemTimeStep
          v-if="shouldShowDateHeader(idx)"
          :label="getDayLabel(mess.timestamp)"
        />

        <ChatsMessagesListItem
          :sender="mess.sender"
          :text="mess.text"
          :timestamp="mess.timestamp"
          :file="mess.file"
          @reply="$emit('reply', $event)"
          :class="getMessageClass(mess, idx)"
        />
      </template>

      <ChatsMessagesListItemSystem />
    </div>
  </el-scrollbar>
</template>

<script setup lang="ts">
import { ref, computed, nextTick, watch } from 'vue'
import type { ElScrollbar } from 'element-plus'
import { useChatMessagesStore } from '~/stores/chats/messages'
import { getDayLabel, isSameDay } from '~/utils/date'

const props = defineProps<{
  searchQuery?: string
}>()

const chatMessagesStore = useChatMessagesStore()
const sortedMessages = computed(() => chatMessagesStore.sortedMessages)

const displayedMessages = computed(() => {
  if (!props.searchQuery?.trim()) return sortedMessages.value

  const q = props.searchQuery.toLowerCase()
  return sortedMessages.value.filter(msg =>
    msg.text?.toLowerCase().includes(q)
  )
})

const scrollbarRef = ref<InstanceType<typeof ElScrollbar>>()
const listRef = ref<HTMLElement | null>(null)


const shouldShowDateHeader = (index: number): boolean => {
  const messages = displayedMessages.value
  if (index === 0) return true 

  const current = messages[index]
  const prev = messages[index - 1]

  if (!current.timestamp || !prev.timestamp) return true

  return !isSameDay(current.timestamp, prev.timestamp)
}

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