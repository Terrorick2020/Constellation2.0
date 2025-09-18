<template>
  <div class="flex h-full max-h-16 items-center justify-between border-b px-5" ref="headerRef">
    <button @click="closeChat">
      <SvgoArrowLeft class="h-6 w-6" :font-controlled="false" />
    </button>
    <div class="flex flex-col items-center">
      <div class="sm font-semibold text-black">Britva</div>
      <div class="text-sm text-gray-400">ты</div>
    </div>
    <div class="flex items-center gap-x-[10px]">
      <UIPopoverMenu :list="LIST_OPTIONS" @select="onSelect">
        <template #reference>
          <button>
            <SvgoMoreVertical class="h-6 w-6" :font-controlled="false" />
          </button>
        </template>
      </UIPopoverMenu>
      <el-avatar :src="Avatar" class="h-[44px] w-[44px] rounded-full">
        <template #fallback>photo</template>
      </el-avatar>
    </div>
  </div>
</template>

<script setup lang="ts">
import Avatar from '@/assets/image/avatar.jpg'
import { ChatKey } from '~/types/chats/symbols'

const chat = inject(ChatKey)

const closeChat = () => chat?.closeChat()

const LIST_OPTIONS = [
  { key: 'profile', label: 'Перейти в профиль', icon: 'personOutline' },
  { key: 'search', label: 'Поиск', icon: 'search' },
  { key: 'report', label: 'Пожаловаться', icon: 'flagOutline' },
  { key: 'block', label: 'Заблокировать', icon: 'closeCircleOutline' }
]

const onSelect = (option: (typeof LIST_OPTIONS)[0]) => {
  console.log(option)
}
</script>
