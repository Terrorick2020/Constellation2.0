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
    title: 'Документ',
    ogTitle: 'Документ',
    description: 'Страница определённого документа',
    ogDescription: 'Страница определённого документа'
})
</script>
