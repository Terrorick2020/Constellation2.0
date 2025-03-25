<template>
  <div :class="['group flex items-center gap-x-[10px]', { 'ml-auto': props.sender }]">
    <div :class="wrapClasses">
      <!-- file message -->
      <div v-if="props.file" class="flex items-center gap-x-[10px]">
        <div class="flex h-12 w-12 items-center justify-center rounded-full border border-gray-200">
          <SVGAttachOutline class="h-6 w-6" :font-controlled="false" />
        </div>
        <div class="flex flex-col gap-y-1">
          <span class="text-sm font-extrabold text-black"> Договор.pdf </span>
          <span class="text-sm font-medium text-gray-500">15,5 MB</span>
        </div>
      </div>

      <!-- simple message -->
      <div v-else :class="textClasses">
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
        <button>
          <SVGUndoOutline class="h-4 w-4 text-gray-500" :font-controlled="false" />
        </button>
      </div>
      <span class="text-sm text-gray-500">19:23</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import SVGAttachOutline from '@/assets/icons/attach-outline.svg'
import SVGCheckmarkCircle2Outline from '@/assets/icons/checkmark-circle-2-outline.svg'
import SVGTrash2Outline from '@/assets/icons/trash-2-outline.svg'
import SVGUndoOutline from '@/assets/icons/undo-outline.svg'

interface Props {
  sender: boolean
  text: string
  file?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  file: false
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
</script>
