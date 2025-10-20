<template>
  <div class="flex h-20 items-center justify-between gap-x-[10px] border-t px-[10px] md:px-4">
    <!-- Кнопка прикрепления файла -->
    <!-- <label class="cursor-pointer">
      <input
        type="file"
        @change="handleFileSelect"
        class="hidden"
        accept="image/*,video/*,audio/*,.pdf,.doc,.docx,.xls,.xlsx"
      />
      <SVGAttachOutline class="h-6 w-6 text-gray-500" :font-controlled="false" />
    </label> -->

    <form class="grow" @submit.prevent="handleSend">
      <el-input
        :model-value="modelValue"
        @update:model-value="onInput"
        :disabled="sending"
        class="h-10 !w-full"
        :maxlength="1280"
        placeholder="Сообщение..."
        @keyup.enter="handleSend"
      />
    </form>

    <button
      @click="handleSend"
      :disabled="(!readySend && !selectedFile) || sending"
      :class="[
        'transition-colors',
        (readySend || selectedFile) && !sending ? '!text-[#E44820]' : 'text-gray-500'
      ]"
    >
      <PaperPlaneIcon class="h-6 w-6" :font-controlled="false" />
    </button>
  </div>

  <div v-if="selectedFile" class="border-t p-2">
    <div class="flex items-center justify-between">
      <span class="text-sm">{{ selectedFile.name }}</span>
      <button @click="clearFile" class="text-red-500 text-sm">Удалить</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import SVGAttachOutline from '@/assets/icons/attach-outline.svg'
import PaperPlaneIcon from '@/assets/icons/paper-plane.svg'
import { computed, ref } from 'vue'

const modelValue = defineModel<string>({ default: '' })

const props = defineProps<{
  sending?: boolean
  // selectedChat?: any
}>()

const emit = defineEmits<{
  (e: 'send', payload: { text: string; file?: File }): void
}>()

const selectedFile = ref<File | null>(null)
const readySend = computed(() => modelValue.value.trim().length > 0)

const handleFileSelect = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files && input.files[0]) {
    selectedFile.value = input.files[0]
  }
}

const clearFile = () => {
  selectedFile.value = null
}

const onInput = (value: string) => {

  modelValue.value = value
}

const handleSend = () => {
  if (props.sending) return

  if (selectedFile.value) {
    emit('send', { text: modelValue.value.trim(), file: selectedFile.value })
    modelValue.value = ''
    selectedFile.value = null
  } else if (readySend.value) {
    emit('send', { text: modelValue.value.trim() })
    modelValue.value = ''
  }
}
</script>



