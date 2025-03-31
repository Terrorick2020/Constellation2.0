<template>
    <div class="inner-block overflow-hidden">
        <AuthResetPass />
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'auth',
})

useSeoMeta({
    title: 'Сброс пароля',
    ogTitle: 'Сброс пароля',
    description: 'Страница сброса пароля',
    ogDescription: 'Страница сброса пароля',
})
</script>