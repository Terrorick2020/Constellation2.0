<template>
    <div class="chats-item">
        <AccountChatsCertain />
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'account',
})

useSeoMeta({
    title: 'Чат',
    ogTitle: 'Чат',
    description: 'Страница чата',
    ogDescription: 'Страница чата'
})
</script>
