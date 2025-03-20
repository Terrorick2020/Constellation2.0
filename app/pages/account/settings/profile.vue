<template>
    <div class="profile">
        <AccountSettingsProfile />
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'account',
})

useSeoMeta({
    title: 'Настройки профиля',
    ogTitle: 'Настройки профиля',
    description: 'Страница настроек профиля',
    ogDescription: 'Страница настроек профиля'
})
</script>
