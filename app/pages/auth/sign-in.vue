<template>
    <div class="sign-in">
        <AuthSignIn />
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'auth',
})

useSeoMeta({
    title: 'Вход',
    ogTitle: 'Вход',
    description: 'Страница входа в систему',
    ogDescription: 'Страница входа в систему'
})
</script>
