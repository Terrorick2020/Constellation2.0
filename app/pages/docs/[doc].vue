<template>
  <div class="flex w-full flex-col gap-[30px]">
    <div class="flex w-full flex-col gap-[30px]">
      <Subscribe :docId="documentId" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';

const route = useRoute(); 
// const docId = route.params.id as string;
const documentId = String(route.params.id);
console.log(documentId)


definePageMeta({
    layout: 'preview',
})

useSeoMeta({
    title: 'Содержание документа',
    ogTitle: 'Содержание документа',
    description: 'Страница содержания документа',
    ogDescription: 'Страница содержания документа',
})
</script>