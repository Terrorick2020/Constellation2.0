<template>
    <div class="main">
        <Preview />
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'preview',
})

useSeoMeta({
    title: 'Информация',
    ogTitle: 'Информация',
    description: 'Страница информации о сервисе',
    ogDescription: 'Страница информации о сервисе'
})
</script>
