<template>
    <div class="sign-up">
        <AuthSignUp />
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'auth',
})

useSeoMeta({
    title: 'Регистрация',
    ogTitle: 'Регистрация',
    description: 'Страница регистрации',
    ogDescription: 'Страница регистрации'
})
</script>
