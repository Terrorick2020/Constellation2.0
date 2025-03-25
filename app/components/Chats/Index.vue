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
  },
  {
    id: 4,
    avatar: AvatarImage,
    label: 'Samsung TechnoFun',
    lastMessage: 'Хорошо, созвонимся в 12?',
    unread: 0,
    pinned: false,
    verified: false,
    muted: true,
    me: true,
    type: 'message'
  },
  {
    id: 5,
    avatar: AvatarImage,
    label: 'Britva',
    lastMessage: 'Добрый день, на связи Britva.',
    unread: 0,
    pinned: false,
    verified: false,
    muted: false,
    me: false,
    type: 'message'
  },
  {
    id: 6,
    avatar: AvatarImage,
    label: 'Britva',
    lastMessage: 'Добрый день, на связи Britva.',
    unread: 0,
    pinned: false,
    verified: false,
    muted: false,
    me: false,
    type: 'message'
  },
  {
    id: 7,
    avatar: AvatarImage,
    label: 'Britva',
    lastMessage: 'Добрый день, на связи Britva.',
    unread: 0,
    pinned: false,
    verified: false,
    muted: false,
    me: false,
    type: 'message'
  },
  {
    id: 8,
    avatar: AvatarImage,
    label: 'Britva',
    lastMessage: 'Добрый день, на связи Britva.',
    unread: 0,
    pinned: false,
    verified: false,
    muted: false,
    me: false,
    type: 'message'
  },
  {
    id: 9,
    avatar: AvatarImage,
    label: 'Britva',
    lastMessage: 'Добрый день, на связи Britva.',
    unread: 0,
    pinned: false,
    verified: false,
    muted: false,
    me: false,
    type: 'message'
  },
  {
    id: 10,
    avatar: AvatarImage,
    label: 'Britva',
    lastMessage: 'Добрый день, на связи Britva.',
    unread: 0,
    pinned: false,
    verified: false,
    muted: false,
    me: false,
    type: 'message'
  },
  {
    id: 11,
    avatar: AvatarImage,
    label: 'Britva',
    lastMessage: 'Добрый день, на связи Britva.',
    unread: 0,
    pinned: false,
    verified: false,
    muted: false,
    me: false,
    type: 'message'
  },
  {
    id: 12,
    avatar: AvatarImage,
    label: 'Britva',
    lastMessage: 'Добрый день, на связи Britva.',
    unread: 0,
    pinned: false,
    verified: false,
    muted: false,
    me: false,
    type: 'message'
  },
  {
    id: 13,
    avatar: AvatarImage,
    label: 'Britva',
    lastMessage: 'Добрый день, на связи Britva.',
    unread: 0,
    pinned: false,
    verified: false,
    muted: false,
    me: false,
    type: 'message'
  },
  {
    id: 14,
    avatar: AvatarImage,
    label: 'Britva',
    lastMessage: 'Добрый день, на связи Britva.',
    unread: 0,
    pinned: false,
    verified: false,
    muted: false,
    me: false,
    type: 'message'
  },
  {
    id: 15,
    avatar: AvatarImage,
    label: 'Britva',
    lastMessage: 'Last message',
    unread: 0,
    pinned: false,
    verified: false,
    muted: false,
    me: false,
    type: 'message'
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
