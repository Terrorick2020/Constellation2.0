<template>
  <div class="flex w-full flex-col gap-[30px]">
    <div class="flex w-full flex-col gap-[30px]">
      <Profile />
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'preview',
})

useSeoMeta({
    title: 'Содержание документа',
    ogTitle: 'Содержание документа',
    description: 'Страница содержания документа',
    ogDescription: 'Страница содержания документа',
})
</script>