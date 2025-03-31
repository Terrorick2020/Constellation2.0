<template>
    <div class="w-full flex flex-col gap-[30px]">
        <ProfileHeader :name="profileName"/>
    </div>
</template>
  
<script setup lang="ts">
import ProfileHeader from '~/components/Profile/Header.vue'; // Импорт компонента ProfileHeader
import { useRoute } from 'vue-router';


const route = useRoute(); // Получаем доступ к роуту
const profileName = route.params.name; // Извлекаем имя из URL

// const i18n: any = useI18n()
// const lang = i18n.locale.value

// const title = i18n.messages.value[ lang ].feedPage?.docTitle
// const desc = i18n.messages.value[ lang ].feedPage?.docDesc


// useSeoMeta({
//     title: title,
//     ogTitle: title,
//     description: desc,
//     ogDescription: desc
// })
</script>