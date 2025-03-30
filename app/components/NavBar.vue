<template>
  <aside class="hidden min-w-40 transform flex-col lg:flex">
    <div class="sticky top-5 w-full">
      <NuxtLink to="/">
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
  { id: 1, title: 'Пользователи', path: '/profiles', iconName: 'compass' },
  { id: 2, title: 'Документы', path: '/docs', iconName: 'search' },
  { id: 3, title: 'Чаты', path: '/chats', iconName: 'message' },
  { id: 4, title: 'Обьявления', path: '/offers', iconName: 'fire' },
  { id: 5, title: 'Настройки профиля', path: '/settings', iconName: 'settings' },
  { id: 6, title: 'Администратору', path: '/admin', iconName: 'lock' },
]
</script>
