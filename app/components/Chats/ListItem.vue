<template>
  <NuxtLink
    to="#"
    @click.prevent="emit('select', props.chat)"
    class="group relative flex flex-nowrap items-center gap-x-[10px] border-b p-5 before:absolute before:bottom-[-1px] before:left-0 before:h-[1px] before:w-5 before:bg-gray-100 after:absolute after:bottom-[-1px] after:right-0 after:h-[1px] after:w-5 after:bg-gray-100 last:border-b-0 hover:bg-gray-200/20"
  >
    <el-avatar :size="52" :src="props.chat.avatar"> photo </el-avatar>
    <div class="flex grow flex-col gap-y-[5px]">
      <div class="flex justify-between">
        <div class="flex items-center gap-x-1">
          <span class="text-sm font-bold text-black">{{ props.chat.label || 'Загрузка...' }}</span>
          <SVGPin2 v-show="props.chat.pinned" class="size-2 text-gray-800" />
          <SVGCheckmarkCircle v-show="props.chat.verified" class="size-2 text-gray-800" />
          <SVGVolumeOff v-show="props.chat.muted" class="size-2 text-gray-800" />
        </div>
        <div class="flex items-center gap-x-1">
          <span class="text-sm text-gray-400">{{ formattedTime || 'Загрузка...' }}</span>
          <ChatsAsideOptions :chat="props.chat" class="hidden rounded group-hover:block" />
        </div>
      </div>

      <div class="flex items-center justify-between">
        <div class="flex items-center gap-1">
          <span v-show="props.chat.me" class="text-sm font-bold text-black"> Вы: </span>
          <SVGPaperClip v-show="props.chat.type === 'document'" class="stroke-[#E44820]" />

          <span :class="textClasses">
            {{ props.chat.lastMessage || 'Загрузка...' }}
          </span>
        </div>
        <div
          v-show="props.chat.unread"
          class="flex h-5 w-5 items-center justify-center rounded-full bg-main-gradient text-[12px] font-bold text-white"
        >
          {{ props.chat.unread }}
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import SVGPin2 from '@/assets/icons/pin2.svg'
import SVGPaperClip from '@/assets/icons/paper-clip.svg'
import SVGVolumeOff from '@/assets/icons/volume-off.svg'
import SVGCheckmarkCircle from '@/assets/icons/checkmark-circle.svg'
import type { IChat } from '~/types/chats'
import { getMetadata } from '~/stores/chats/getMetadata'


import { computed } from 'vue'






interface Props {
  chat: IChat
}

interface Emits {
  (e: 'select', chat: IChat): IChat
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

console.log('props', props)

const formattedTime = computed(() => {
  if (!props.chat.lastTime) return ''
  const date = new Date(props.chat.lastTime)
  return date.toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit'
  })
})

const textClasses = computed(() => {
  return ['text-sm', props.chat.type === 'document' ? 'text-[#E44820]' : 'text-black/50']
})
</script>
