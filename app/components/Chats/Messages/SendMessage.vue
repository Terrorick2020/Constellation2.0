<template>
  <div class="flex h-20 items-center justify-between gap-x-[10px] border-t px-[10px] md:px-4">
    <!-- attach -->
    <button>
      <SVGAttachOutline class="h-6 w-6 text-gray-500" :font-controlled="false" />
    </button>

    <!-- input -->
    <form class="grow" @submit.prevent="handleSend">
      <el-input v-model="inputMessage" class="h-10 !w-full" placeholder="Сообщение..."></el-input>
      <!-- add smiles -->
    </form>

    <!-- send button -->
    <button
      @click="handleSend"
      :class="[readySend ? '!text-[#E44820]' : 'text-gray-500']"
      :disabled="!readySend"
    >
      <PaperPlaneIcon class="h-6 w-6" :font-controlled="false" />
    </button>
  </div>
</template>

<script setup lang="ts">
import SVGAttachOutline from '@/assets/icons/attach-outline.svg'
import PaperPlaneIcon from '@/assets/icons/paper-plane.svg'

const emit = defineEmits(['send'])
const inputMessage = defineModel({ type: String, default: '' })
const readySend = computed(() => inputMessage.value.length > 0)

const handleSend = () => {
  emit('send', inputMessage.value)
}
</script>
