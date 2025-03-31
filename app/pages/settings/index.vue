<template>
  <Settings />
</template>

<script setup lang="ts">
const viewport = useViewport();
const isDesktop = !viewport.isLessThan('desktop');

if (isDesktop) {
  navigateTo('/settings/common');
}

definePageMeta({
  path: '/settings',
})


useSeoMeta({
  title: 'Настройки',
  ogTitle: 'Настройки',
  description: 'Страница настроек',
  ogDescription: 'Страница настроек',
})

</script>
