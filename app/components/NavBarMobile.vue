<template>
  <div
    id="mobilenav"
    class="sticky bottom-0 z-[110] flex w-full justify-center bg-white py-[8px] lg:hidden"
  >
    <div class="text-xxs z-[150] flex w-[90%] items-center justify-between">
      <NavigationLink
        v-for="link in navigationLinks"
        :key="link.id"
        :link="link"
        class="w-[55px] flex-col gap-[4px] p-[8px]"
        mobile
      />
    </div>
  </div>
</template>

<script setup>
const route = useRoute()

const navigationLinks = [
  { id: 1, title: 'Пользователи', path: '/profiles', iconName: 'compass', isBadge: false },
  { id: 2, title: 'Документы', path: '/docs', iconName: 'search', isBadge: true },
  { id: 3, title: 'Чаты', path: '/chats', iconName: 'message', isBadge: true },
  { id: 4, title: 'Уведомления', path: '/offers', iconName: 'fire', isBadge: true },
  { id: 5, title: 'Настройки', path: '/settings', iconName: 'settings', isBadge: false },
]
</script>

<style scoped>
#mobilenav {
  box-shadow:
    0 -4px 6px -1px rgb(0 0 0 / 10%),
    0 -2px 2px -2px rgb(0 0 0 / 10%);
}
</style>
