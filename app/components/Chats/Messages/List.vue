<template>
  <el-scrollbar ref="scrollbarRef" wrap-class="!scroll-smooth">
    <!-- list -->
    <div ref="listRef" class="relative flex flex-col justify-end p-5">
      <ChatsMessagesListItem :sender="false" :text="'Сообщение'" class="mb-[10px]" />
      <ChatsMessagesListItem :sender="false" :text="'Сообщение'" />

      <!-- time step -->
      <ChatsMessagesListItemTimeStep />

      <ChatsMessagesListItem
        v-for="(mess, idx) in MESSAGES"
        :key="mess.text"
        :sender="mess.sender"
        :text="mess.text"
        :file="mess?.file"
        :class="getMessageClass(mess, idx)"
      />

      <!-- system message -->
      <ChatsMessagesListItemSystem />
    </div>
  </el-scrollbar>
</template>

<script setup lang="ts">
import type { ElScrollbar } from 'element-plus'

const scrollbarRef = ref<InstanceType<typeof ElScrollbar>>()
const listRef = ref<HTMLElement | null>(null)

const MESSAGES = [
  { sender: true, text: 'Текстовое сообщение 1' },
  { sender: true, text: 'Текстовое сообщение 2 ' },
  { sender: false, text: 'Текстовое сообщение 3' },
  { sender: false, text: 'Текстовое сообщение 4' },
  { sender: false, text: 'Текстовое сообщение 5' },
  { sender: false, text: 'Текстовое сообщение 6 ' },
  { sender: true, text: 'Текстовое сообщение 7' },
  { sender: true, text: 'Текстовое сообщение 8' },
  { sender: true, text: 'Текстовое сообщение 9' },
  { sender: false, text: 'Текстовое сообщение 10' },
  { sender: false, text: 'Текстовое сообщение 11' },
  { sender: false, file: true, text: '' }
]

const scrollToLastMessage = () => {
  if (!listRef.value || !scrollbarRef.value) return

  scrollbarRef.value.setScrollTop(listRef.value.scrollHeight)
}

type TMessage = (typeof MESSAGES)[0]
const getMessageClass = (message: TMessage, index: number) => {
  const isLastInGroup = !MESSAGES[index + 1] || MESSAGES[index + 1].sender !== message.sender
  return isLastInGroup ? 'mb-4' : 'mb-[10px]'
}

// onMounted(scrollToLastMessage)
nextTick(scrollToLastMessage)
</script>
