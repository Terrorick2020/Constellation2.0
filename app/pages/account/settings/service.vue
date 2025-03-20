<template>
    <div class="service">
        <AccountSettingsService />
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'account',
})

useSeoMeta({
    title: 'Настройки сервиса',
    ogTitle: 'Настройки сервиса',
    description: 'Страница настроек сервиса',
    ogDescription: 'Страница настроек сервиса'
})
</script>
