<template>
  <aside class="hidden min-w-40 transform flex-col lg:flex">
    <div class="sticky top-5 w-full">
      <NuxtLink to="/preview">
        <UILogo />
      </NuxtLink>
      <div class="pt-10">
        <NavigationLink
          v-for="link in navigationLinks"
          :key="link.id"
          :link="link"
          class="border-b border-black/10 py-5 first:pt-0 last:border-0"
        />
      </div>
    </div>
  </aside>
</template>
<script setup lang="ts">
const navigationLinks = [
  { id: 1, title: 'Пользователи', path: '/profiles', iconName: 'compass', isBadge: false },
  { id: 2, title: 'Документы', path: '/docs', iconName: 'search', isBadge: true },
  { id: 3, title: 'Чаты', path: '/chats', iconName: 'message', isBadge: true },
  { id: 4, title: 'Уведомления', path: '/offers', iconName: 'fire', isBadge: true },
  { id: 5, title: 'Настройки', path: '/settings', iconName: 'settings', isBadge: false },
]
</script>
