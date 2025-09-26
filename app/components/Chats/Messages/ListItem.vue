<script setup lang="ts">
import SVGAttachOutline from '@/assets/icons/attach-outline.svg'
import SVGCheckmarkCircle2Outline from '@/assets/icons/checkmark-circle-2-outline.svg'
import SVGTrash2Outline from '@/assets/icons/trash-2-outline.svg'
import SVGUndoOutline from '@/assets/icons/undo-outline.svg'
import { computed } from 'vue'

interface Props {
  sender: boolean
  text: string
  file?: any 
  timestamp?: number
}

const props = withDefaults(defineProps<Props>(), {
  file: undefined,
  timestamp: undefined
})

const wrapClasses = computed(() => {
  return [
    'p-3 md:p-4',
    props.sender
      ? 'order-1 rounded-t-2xl rounded-bl rounded-br-2xl bg-main-gradient'
      : 'rounded-t-2xl rounded-bl rounded-br-2xl border border-gray-200 bg-white'
  ]
})

const textClasses = computed(() => {
  return ['text-sm', props.sender ? 'text-white' : 'text-black']
})

const formattedTime = computed(() => {
  if (!props.timestamp) return ''
  const date = new Date(props.timestamp)
  return date.toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit'
  })
})

const isImage = computed(() => {
  return props.file?.media_type?.startsWith('image/')
})

const fileUrl = computed(() => {
  return props.file?.media_url || ''
})

const fileName = computed(() => {
  return props.file?.fileName || props.file?.media_url?.split('/').pop() || 'файл'
})
</script>

<template>
  <div :class="['group flex items-center gap-x-[10px]', { 'ml-auto': props.sender }]">
    <div :class="wrapClasses">
      <div v-if="props.file" class="mt-2">
        <img
          v-if="isImage"
          :src="fileUrl"
          :alt="fileName"
          class="max-w-full h-auto rounded"
        />
        <a
          v-else
          :href="fileUrl"
          target="_blank"
          class="flex items-center gap-2 text-blue-500 underline"
        >
          <SVGAttachOutline class="h-5 w-5" />
          <span>{{ fileName }}</span>
        </a>
      </div>

      <div
        v-else
        :class="textClasses"
        class="max-w-full whitespace-pre-wrap break-words"
        style="word-break: break-all; overflow-wrap: break-word"
      >
        {{ props.text }}
      </div>
    </div>
    <div :class="['flex flex-col gap-y-[5px]', { 'items-end': props.sender }]">
      <div class="hidden gap-x-[5px] group-hover:flex">
        <button>
          <SVGCheckmarkCircle2Outline class="h-4 w-4 text-gray-500" :font-controlled="false" />
        </button>
        <button>
          <SVGTrash2Outline class="h-4 w-4 text-gray-500" :font-controlled="false" />
        </button>
        <button @click="$emit('reply', { text: props.text, sender: props.sender })">
          <SVGUndoOutline class="h-4 w-4 text-gray-500" :font-controlled="false" />
        </button>
      </div>
      <span class="text-sm text-gray-500">{{ formattedTime }}</span>
    </div>
  </div>
</template>