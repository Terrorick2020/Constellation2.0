<template>
  <div class="flex h-[calc(100vh-81px)] min-h-28 lg:h-[95vh]">
    <Chats />
  </div>
</template>

<script setup lang="ts">
const i18n: any = useI18n()
const lang = i18n.locale.value

const title = i18n.messages.value[lang].chatsPage?.docTitle
const desc = i18n.messages.value[lang].chatsPage?.docDesc

useSeoMeta({
  title: title,
  ogTitle: title,
  description: desc,
  ogDescription: desc
})

definePageMeta({
  layout: 'chats'
})
</script>
