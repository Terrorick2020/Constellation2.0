<template>
  <div
    :class="[
      'flex min-h-16 flex-col justify-center gap-y-4 border-b px-5',
      { 'py-5': isShowArchive }
    ]"
  >
    <ChatsHeaderArchive v-show="isShowArchive" @click="toggleShow" />

    <div class="flex w-full items-center justify-between">
      <ChatsHeaderSearch />
      <button v-show="!isShowArchive" @click="toggleShow" class="ml-auto">
        <SvgoArchive class="size-6" :font-controlled="false" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isShowArchive = ref(false)
const toggleShow = () => {
  isShowArchive.value = !isShowArchive.value
}

defineExpose({
  isShowArchive
})
</script>