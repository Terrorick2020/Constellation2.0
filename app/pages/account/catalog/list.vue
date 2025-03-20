<template>
    <div class="catalog">
        <AccountCatalogList />
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'account',
})

useSeoMeta({
    title: 'Каталог',
    ogTitle: 'Каталог',
    description: 'Страница каталога догументов',
    ogDescription: 'Страница каталога догументов'
})
</script>
