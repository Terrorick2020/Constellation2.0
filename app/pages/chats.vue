<template>
  <div class="flex h-[calc(100vh-81px)] min-h-28 lg:h-[95vh]">
    <Chats />
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Чаты',
  ogTitle: 'Чаты',
  description: 'Страница чатов',
  ogDescription: 'Страница чатов'
})

definePageMeta({
  layout: 'chats'
})
</script>
