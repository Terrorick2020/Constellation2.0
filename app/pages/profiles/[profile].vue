<template>
    <div class="w-full flex flex-col gap-[30px]">
        <ProfileHeader :username="profileName"/>
    </div>
</template>
  
<script setup lang="ts">
import ProfileHeader from '~/components/Profile/Header.vue'; // Импорт компонента ProfileHeader
import { useRoute } from 'vue-router';


const route = useRoute(); // Получаем доступ к роуту
const profileName = route.params.profile as string;


useSeoMeta({
    title: profileName,
    ogTitle: profileName,
    description: 'Страница профиля',
    ogDescription: 'Страница профиля',
})
</script>