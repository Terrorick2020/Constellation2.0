<template>
  <!-- left side -->
  <ChatsList :chats="CHATS" @select-chat="selectChat" />

  <!-- messages -->
  <section class="h-full w-full overflow-x-hidden">
    <ChatsMessages
      v-show="selectedChat"
      :class="[
        'fixed lg:relative lg:translate-x-0',
        selectedChat ? '-translate-x-full' : 'translate-x-full'
      ]"
    />
    <ChatsNotSelectedChat v-show="!selectedChat" />
  </section>
</template>

<script setup lang="ts">
import AvatarImage from '@/assets/image/avatar.jpg'
import { ChatKey } from '~/types/chats/symbols'
import type { IChat } from '~/types/chats'

const mountedGetChats = () => {
  // window.Echo.channel('public')
  //     .listen('ExampleEvent', (e: any) => {
  //         console.log(e)
  // })
}

onMounted(() => {
  mountedGetChats()
})

const CHATS: IChat[] = [
  {
    id: 1,
    avatar: AvatarImage,
    label: 'Britva',
    lastMessage: 'Добрый день, на связи Britva.',
    unread: 2,
    pinned: true,
    verified: false,
    muted: false,
    me: false,
    type: 'message'
  },
  {
    id: 2,
    avatar: AvatarImage,
    label: 'Nintendo Россия',
    lastMessage: 'Добрый день, на связи Britva.',
    unread: 2,
    pinned: false,
    verified: false,
    muted: false,
    me: false,
    type: 'message'
  },
  {
    id: 3,
    avatar: AvatarImage,
    label: 'Сбербанк',
    lastMessage: 'шаблон_договора.pdf',
    unread: 0,
    pinned: false,
    verified: true,
    muted: false,
    me: false,
    type: 'document'
  }
  
]

const selectedChat = ref<IChat | null>(null)

const selectChat = (chat: IChat) => {
  console.log(chat)
  selectedChat.value = chat
}

const closeChat = () => {
  selectedChat.value = null
}

provide(ChatKey, {
  closeChat
})
</script>
