<template>
  <div class="flex-col settings-wrapper flex top-5 gap-6 p-[20px]">
    <div class="flex-col flex">
      <span class="settings-title font-bold">Ваш профиль</span>
      <div class="flex-col flex gap-3">
        <SettingsUserInfo/>
        <SettingsUserNotification 
          v-for="notification in notifications" 
          :key="notification.id"
          :name="notification.name"
          :description="notification.description"
          :action="notification.action"
          :actionName="notification.actionName"
        />
      </div>
    </div>  
    <div
      class="flex flex-col"
      v-for="linkGroup in navigationLinks"
      :key="linkGroup.id"
    >
        <span class="settings-title font-bold">{{ linkGroup.title }}</span>
        <NavigationLink
          v-for="link in linkGroup.children"
          :key="link.id"
          :link="link"
          v-bind:useOpacity="false"
          class="border-b py-5 last:mb-0 btn-main settings-button"
        />
    </div>
  </div>
</template> 

<script setup lang="ts">
const notifications = [
  {
    id: 'profile-is-not-verified',
    name: 'Профиль не подтвержден',
    description: 'Подтвердите документы, чтобы получить доступ к переписке с другими пользователями.',
    actionName: 'Подтвердить',
    action: () => {console.log('todo try to verify user')}
  }
]

const profileSettings = [
  { id: 1, title: 'Настройки профиля', path: '/settings/common', iconName: 'brief-case', color: '#FF6C46' },
  { id: 2, title: 'Настройки сервиса', path: '/settings/scope', iconName: 'move', color: '#FF6C46' },
  // { id: 3, title: 'Портрет клиентов', path: '/settings/clients', iconName: 'people', color: '#FF6C46' },
  // { id: 4, title: 'Рекламный инвентарь', path: '/settings/inventory', iconName: 'list', color: '#FF6C46' },
]

const serviceSettings = []

const navigationLinks = [
  {id: 1, title: 'Настройки профиля', children: profileSettings},
  {id: 1, title: 'Настройки сервиса', children: serviceSettings},
]
</script>
  