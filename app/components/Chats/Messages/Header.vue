<template>
  <div class="flex h-full max-h-16 items-center justify-between border-b px-5" ref="headerRef">
    <button @click="closeChat">
      <SvgoArrowLeft class="h-6 w-6" :font-controlled="false" />
    </button>

    <div class="flex flex-col items-center">
      <div class="sm font-semibold text-black">
        {{ selectedChat?.label || 'Выберите чат' }}
      </div>
      <div class="text-sm text-gray-400">Онлайн</div>
    </div>

    <div class="flex items-center gap-x-[10px]">
      <UIPopoverMenu :list="LIST_OPTIONS" @select="onSelect">
        <template #reference>
          <button>
            <SvgoMoreVertical class="h-6 w-6" :font-controlled="false" />
          </button>
        </template>
      </UIPopoverMenu>
      <el-avatar :src="selectedChat?.avatar || Avatar" class="h-[44px] w-[44px] rounded-full">
        <template #fallback>photo</template>
      </el-avatar>
    </div>
  </div>
</template>

<script setup lang="ts">
import Avatar from '@/assets/image/avatar.jpg'
import { ChatKey } from '~/types/chats/symbols'
import type { IChat } from '~/types/chats'
import { inject } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps<{
  selectedChat: IChat | null
}>()

const emit = defineEmits<{
  (e: 'search'): void 
}>()

const router = useRouter()
const chat = inject(ChatKey)
const closeChat = () => chat?.closeChat()

const LIST_OPTIONS = [
  { key: 'profile', label: 'Перейти в профиль', icon: 'personOutline' },
  { key: 'search', label: 'Поиск', icon: 'search' },
  { key: 'report', label: 'Пожаловаться', icon: 'flagOutline' },
  { key: 'block', label: 'Заблокировать', icon: 'closeCircleOutline' }
]

const onSelect = (option: (typeof LIST_OPTIONS)[0]) => {
  if (option.key === 'profile' && props.selectedChat) {
    router.push(`/profiles/${props.selectedChat.userId}`)
  } else if (option.key === 'search') {
    emit('search') 
  }
  console.log(option)
}
</script>