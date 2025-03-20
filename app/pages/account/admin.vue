<template>
    <div class="admin">
        <AccountAdmin />
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'account',
})

useSeoMeta({
    title: 'Админ-панель',
    ogTitle: 'Админ-панель',
    description: 'Страница админ-панели',
    ogDescription: 'Страница админ-панели'
})
</script>
