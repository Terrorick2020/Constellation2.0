<template>
  <div class="flex w-full flex-col gap-[30px]">
    <div class="flex w-full flex-col gap-[30px]">
      <Subscribe :docname="docName  " />
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute(); 
const docName = route.params.doc as string;

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