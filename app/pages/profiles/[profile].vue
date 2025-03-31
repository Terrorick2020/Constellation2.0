<template>
    <div class="w-full flex flex-col gap-[30px]">
        <ProfileCurrentUser :username="profileName" :fio="profileFIO"/>
    </div>
</template>
  
<script setup lang="ts">
import ProfileHeader from '~/components/Profile/CurrentUser.vue'; 
import { useRoute } from 'vue-router';


const route = useRoute(); 
const profileName = route.params.profile as string;
const profileFIO = route.query.current_name as string;



// const profileName = route.params.profile as string;
// const profileFIO = route.query.fio as string;

useSeoMeta({
    title: profileName,
    ogTitle: profileName,
    description: 'Страница профиля',
    ogDescription: 'Страница профиля',
})
</script>