<template>
  <div class="flex w-full flex-col gap-[30px]">
    <el-empty description="Здесь будет лента рекомендаций" />
  </div>
</template>

<script setup lang="ts">
const i18n: any = useI18n()
const lang = i18n.locale.value

const title = i18n.messages.value[lang].feedPage?.docTitle
const desc = i18n.messages.value[lang].feedPage?.docDesc

useSeoMeta({
  title: title,
  ogTitle: title,
  description: desc,
  ogDescription: desc
})
</script>
