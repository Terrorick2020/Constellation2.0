<template>
    <div class="inner-block overflow-hidden">
        <AuthSignIn />
    </div>
</template>

<script setup lang="ts">
const i18n: any = useI18n()
const lang = i18n.locale.value

const title = i18n.messages.value[ lang ].authPage.signIn.docTitle
const desc = i18n.messages.value[ lang ].authPage.signIn.docDesc

definePageMeta({
    layout: 'auth',
})

useSeoMeta({
    title: title,
    ogTitle: title,
    description: desc,
    ogDescription: desc
})
</script>