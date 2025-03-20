<template>
    <div class="ads">
        <AccountNotification />
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'account',
})

useSeoMeta({
    title: 'Объявления',
    ogTitle: 'Объявления',
    description: 'Страница объявлений',
    ogDescription: 'Страница объявлений'
})
</script>
