<script setup lang="ts">
const route = useRoute();

const i18n: any = useI18n()
const lang = i18n.locale.value

const title = i18n.messages.value[ lang ].settingsPage?.common.docTitle
const desc = i18n.messages.value[ lang ].settingsPage?.common.docDesc

definePageMeta({
  path: '/settings/:part',
})

useSeoMeta({
  title: title,
  ogTitle: title,
  description: desc,
  ogDescription: desc
})
</script>

<template>
  <Settings :path="route.params.part" />
</template>
