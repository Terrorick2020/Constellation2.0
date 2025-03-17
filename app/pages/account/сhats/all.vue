<template>
    <div class="chats">
        <AccountChatsAll />
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'account',
})

useSeoMeta({
    title: 'Чаты',
    ogTitle: 'Чаты',
    description: 'Страница чатов',
    ogDescription: 'Страница чатов'
})
</script>
