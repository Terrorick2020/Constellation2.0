<template>
  <Settings :path="route.params.part" />
</template>

<script setup lang="ts">
const route = useRoute();

definePageMeta({
  path: '/settings/:part',
})

useSeoMeta({
  title: 'Настройки',
  ogTitle: 'Настройки',
  description: 'Страница настроек',
  ogDescription: 'Страница настроек',
})
</script>
