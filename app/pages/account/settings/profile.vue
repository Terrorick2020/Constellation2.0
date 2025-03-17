<template>
    <div class="profile">
        <AccountProfile />
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
