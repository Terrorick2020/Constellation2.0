<template>
  <ChatsList
    :chats="chats"
    @select-chat="selectChat"
    :loading="loading"
  />

  <section class="h-full w-full overflow-x-hidden">
    <ChatsMessages
      v-show="selectedChat"
      :selected-chat="selectedChat"
      :class="[
        'fixed lg:relative lg:translate-x-0',
        selectedChat ? '-translate-x-full' : 'translate-x-full'
      ]"
    />
    <ChatsNotSelectedChat v-show="!selectedChat" />
  </section>
</template>

<script setup lang="ts">
import { ChatKey } from '~/types/chats/symbols'
import type { IChat } from '~/types/chats'
import { onMounted, ref, provide } from 'vue'
import { useChats } from '~/stores/chats/getChats'
import { getMetadata } from '~/stores/chats/getMetadata'
import { getMessages } from '~/stores/chats/getMessage'
import { useChatMessagesStore } from '~/stores/chats/messages'
import {readMessages} from '~/stores/chats/readMessage'
import { useAuthStore } from '~/stores/auth'
import { joinChatRoom } from '~/utils/sockets'
import { subscribeToNewMessage } from '~/utils/sockets'


const { chats, loading, fetchChats } = useChats()
const selectedChat = ref<IChat | null>(null)
const authStore = useAuthStore()
const chatMessagesStore = useChatMessagesStore()
const unsubscribe = ref<(() => void) | null>(null)


const joinChat = async (chatId: string) => {
  if (!chatId) return
  if (!authStore.userId) {
    console.warn('Нет userId для подключения к чату')
    return
  }

  try {
    await joinChatRoom(chatId)
    console.log('Присоединились к чату:', chatId)
  } catch (error) {
    console.error('Ошибка подключения к чату:', error)
  }
}

onMounted(() => {
  if (unsubscribe.value) {
    console.log('Отписываемся от WebSocket при уходе со страницы')

    unsubscribe.value()
  }
  fetchChats()
})


const selectChat = async (chat: IChat) => {
   if (unsubscribe.value) {
    unsubscribe.value()
    console.log('Отписываемся от предыдущего чата')

    unsubscribe.value = null
  }
  // chatMessagesStore.clear()

  selectedChat.value = chat
  console.log('Выбран чат:', chat.id)

  try {
    const chatId = chat.id.toString()

    
    const metadata = await getMetadata(chatId)
    console.log('Ответ от сервера на получение метаданных:', metadata)
    
    const getChats = await fetchChats()
    console.log('Ответ от сервера на получение чатов:', getChats)
  
    const readResult = await readMessages(chatId)
    console.log('Ответ от сервера на чтение чата:', readResult) 
    const result = await getMessages(chatId)
    console.log('Ответ от сервера на получение сообщении:', result)
    if (result.success) {
      const mappedMessages = result.data.map((msg: any) => ({
        id: msg.id,
        text: msg.text,
        sender: msg.fromUser === authStore.userId?.toString(),
        timestamp: msg.created_at
      }))
      chatMessagesStore.setMessages(mappedMessages)
    }
    await joinChat(chatId)
    console.log('Подписываемся на событие "new-message"')
    
    unsubscribe.value = subscribeToNewMessage((message) => {
  console.log('Получено новое сообщение через WebSocket:', message)
  
  if (message.chatId === chatId) {
    const isOwn = String(message.fromUser) === String(authStore.userId)
    chatMessagesStore.addMessage(
      message.text,
      isOwn, 
      message.created_at || Date.now()
    )
  }
})
  } catch (error) {
    console.error('Ошибка загрузки сообщений:', error)
  }
}

const closeChat = () => {
  selectedChat.value = null
}

provide(ChatKey, {
  closeChat
})
</script>




