<template>
    <div class="w-full flex flex-col gap-[30px]">
        <ProfileCurrentUser :username="profileName"/>
    </div>
</template>
  
<script setup lang="ts">
import ProfileHeader from '~/components/Profile/CurrentUser.vue'; 
import { useRoute } from 'vue-router';


const route = useRoute(); 
const profileName = route.params.profile as string;

useSeoMeta({
    title: profileName,
    ogTitle: profileName,
    description: 'Страница профиля',
    ogDescription: 'Страница профиля',
})
</script>