<template>
  <aside class="hidden mt-1 min-w-40 transform flex-col lg:flex">
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
import { clientRoutes } from '~/env/routes.env'


const globAccountRoute= clientRoutes.account.main
const globSettingsRoute = clientRoutes.account.local.settings.main
const globChatsRoute = clientRoutes.account.local.chats.main
const globCatalogRoute = clientRoutes.account.local.catalog.main

const adminRoute = clientRoutes.account.local.admin
const adsRoute = clientRoutes.account.local.notification
const settingsProfileRoute = clientRoutes.account.local.settings.local.profile
const catalogListRoute = clientRoutes.account.local.catalog.local.list
const chatsAllRoute = clientRoutes.account.local.chats.local.all

const toAdmin = `${globAccountRoute}${adminRoute}`
const toNotification = `${globAccountRoute}${adsRoute}`
const toProfileSettings = `${globAccountRoute}${globSettingsRoute}${settingsProfileRoute}`
const toCatalogList = `${globAccountRoute}${globCatalogRoute}${catalogListRoute}`
const toChatsAll = `${globAccountRoute}${globChatsRoute}${chatsAllRoute}`

const navigationLinks = [
  { id: 1, title: 'Каталог', path: toCatalogList, iconName: 'search' },
  { id: 2, title: 'Обьявления', path: toNotification, iconName: 'fire' },
  { id: 3, title: 'Чаты', path: toChatsAll, iconName: 'message' },
  { id: 4, title: 'Админ-панель', path: toAdmin, iconName: 'compass' },
  { id: 5, title: 'Настройки', path: toProfileSettings, iconName: 'settings' }
]
</script>
