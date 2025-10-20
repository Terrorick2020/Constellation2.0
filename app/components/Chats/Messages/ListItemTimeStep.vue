<template>
  <div class="my-4 flex items-center gap-x-[10px]">
    <span class="h-[1px] flex-1 bg-gray-200"></span>
    <span class="shrink-0 text-sm text-gray-500 px-2">{{ label }}</span>
    <span class="h-[1px] flex-1 bg-gray-200"></span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label: string
}>()
</script>