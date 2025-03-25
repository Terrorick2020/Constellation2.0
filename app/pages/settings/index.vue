<script setup lang="ts">
const i18n: any = useI18n()
const lang = i18n.locale.value

const title = i18n.messages.value[ lang ].settingsPage?.common.docTitle
const desc = i18n.messages.value[ lang ].settingsPage?.common.docDesc


definePageMeta({
  path: '/settings',
})


const viewport = useViewport();
const isDesktop = !viewport.isLessThan('desktop');

if (isDesktop) {
  navigateTo('/settings/common');
}

useSeoMeta({
  title: title,
  ogTitle: title,
  description: desc,
  ogDescription: desc
})

</script>

<template>
  <Settings />
</template>