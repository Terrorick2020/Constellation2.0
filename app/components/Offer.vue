<template>
    <div class="flex flex-col">
    <div class="offer-header justify-between flex items-center">
        <div class="flex items-center gap-2 w-full">
        <el-avatar :size="48" :src="$images['avatar']" />
        <div class="flex flex-col">
          <span class="font-bold">Samsung TechnoFun</span>
          <span class="text-xs opacity-40">Техника</span>
        </div>
        </div>
        <button>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M12 7C13.104 7 14 6.104 14 5C14 3.896 13.104 3 12 3C10.896 3 10 3.896 10 5C10 6.104 10.896 7 12 7ZM12 10C10.896 10 10 10.896 10 12C10 13.104 10.896 14 12 14C13.104 14 14 13.104 14 12C14 10.896 13.104 10 12 10ZM10 19C10 17.896 10.896 17 12 17C13.104 17 14 17.896 14 19C14 20.104 13.104 21 12 21C10.896 21 10 20.104 10 19Z" fill="#231F20"/>
                <mask id="mask0_691_5701" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="10" y="3" width="4" height="18">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M12 7C13.104 7 14 6.104 14 5C14 3.896 13.104 3 12 3C10.896 3 10 3.896 10 5C10 6.104 10.896 7 12 7ZM12 10C10.896 10 10 10.896 10 12C10 13.104 10.896 14 12 14C13.104 14 14 13.104 14 12C14 10.896 13.104 10 12 10ZM10 19C10 17.896 10.896 17 12 17C13.104 17 14 17.896 14 19C14 20.104 13.104 21 12 21C10.896 21 10 20.104 10 19Z" fill="white"/>
                </mask>
                <g mask="url(#mask0_691_5701)">
                </g>
            </svg>
        </button>
    </div>
    <div class="offer-content mt-2 flex flex-col">
        <img :src="OfferImg" alt="banner" class="w-full object-cover object-center lg:h-full rounded-xl">
        <div class="block-wrapper relative z-[3]]  mt-[-30px] lg:rounded[20px]" style="padding: 20px;" >
            <h2 class="text-xs font-bold opacity-60">Актуально до 18.05.2025</h2>
            <nuxt-link href="/offer"><h1 class="text-[20px] font-extrabold mt-2">Длинный заголовок предложенния, максимум в 2 строки</h1></nuxt-link>

            <div class="h-[1px] w-[98%] bg-black/10 mt-4"></div>

            <h2 class="text-xs font-bold opacity-60 mt-2">ПРИГЛАШАЕМ К СОТРУДНИЧЕСТВУ</h2>

            <p class="text-xs font-bold mt-3">Компании</p>
            <div class="flex flex-wrap gap-1 mt-2">
                <span class="el-tag el-tag--primary el-tag--light is-round dark active"><span class="el-tag__content">Красота и здоровье</span><!--v-if--></span>
                <span class="el-tag el-tag--primary el-tag--light is-round dark"><span class="el-tag__content">Стрижки</span><!--v-if--></span>
                <span class="el-tag el-tag--primary el-tag--light is-round dark"><span class="el-tag__content">Мода</span><!--v-if--></span>
                <span class="el-tag el-tag--primary el-tag--light is-round dark"><span class="el-tag__content">Путешествия</span><!--v-if--></span>
            </div>
            
            <p class="text-xs font-bold mt-3">Блогеры</p>
            <div class="flex flex-wrap gap-1 mt-2">
                <span class="el-tag el-tag--primary el-tag--light is-round dark"><span class="el-tag__content">Стрижки</span><!--v-if--></span>
                <span class="el-tag el-tag--primary el-tag--light is-round dark"><span class="el-tag__content">Мода</span><!--v-if--></span>
                <span class="el-tag el-tag--primary el-tag--light is-round dark"><span class="el-tag__content ">Красота и здоровье</span><!--v-if--></span>

            </div>
           <p class="text-xs font-bold mt-3">Проекты</p>
            <div class="flex flex-wrap gap-1 mt-2">
                <span class="el-tag el-tag--primary el-tag--light is-round dark"><span class="el-tag__content">Стрижки</span><!--v-if--></span>
                <span class="el-tag el-tag--primary el-tag--light is-round dark"><span class="el-tag__content">Мода</span><!--v-if--></span>
            </div>
            <div class="h-[1px] w-[98%] bg-black/10 mt-4"></div>
            
            <h2 class="text-xs font-bold opacity-60 mt-2">ГОРОДА</h2>
            <div class="flex flex-wrap gap-1 mt-2">
                <span class="el-tag el-tag--primary el-tag--light is-round dark"><span class="el-tag__content">🇷🇺 Москва</span><!--v-if--></span>
                <span class="el-tag el-tag--primary el-tag--light is-round dark"><span class="el-tag__content">🇷🇺 Тюмень</span><!--v-if--></span>
            </div>
        </div>
    </div>
    </div>
    
</template>

<script setup lang="ts">
import OfferImg from '~/assets/image/offer-banner.jpg'
</script>