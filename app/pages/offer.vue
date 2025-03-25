<template>
    <div class="mt-4 flex flex-line flex-row-reverse flex-wrap w-full gap-[30px] full-offer-block">
    <div class="flex flex-col gap-3 full-offer full-offer-nav">
        <div class="h-[185px] basic-block bg-white flex flex-col gap-[20px] leading-[27px]" style="padding:30px">
            <h2 class="text-[20px] font-extrabold">Длинный заголовок моего замечательного нового или старого предложения</h2>
            <div class="flex items-center gap-1">        
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g opacity="0.5">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M16 11H13V8C13 7.447 12.552 7 12 7C11.448 7 11 7.447 11 8V12C11 12.553 11.448 13 12 13H16C16.553 13 17 12.553 17 12C17 11.447 16.553 11 16 11ZM12 20C7.589 20 4 16.411 4 12C4 7.589 7.589 4 12 4C16.411 4 20 7.589 20 12C20 16.411 16.411 20 12 20ZM12 2C6.486 2 2 6.486 2 12C2 17.514 6.486 22 12 22C17.514 22 22 17.514 22 12C22 6.486 17.514 2 12 2Z" fill="black"/>
                    <mask id="mask0_691_5918" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="2" y="2" width="20" height="20">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M16 11H13V8C13 7.447 12.552 7 12 7C11.448 7 11 7.447 11 8V12C11 12.553 11.448 13 12 13H16C16.553 13 17 12.553 17 12C17 11.447 16.553 11 16 11ZM12 20C7.589 20 4 16.411 4 12C4 7.589 7.589 4 12 4C16.411 4 20 7.589 20 12C20 16.411 16.411 20 12 20ZM12 2C6.486 2 2 6.486 2 12C2 17.514 6.486 22 12 22C17.514 22 22 17.514 22 12C22 6.486 17.514 2 12 2Z" fill="white"/>
                    </mask>
                    <g mask="url(#mask0_691_5918)">
                    <rect width="100" height="100" fill="black"/>
                    </g>
                    </g>
                </svg>

                <h2 class="text-[14px] font-bold opacity-60">Актуально до 18.05.2025</h2>
            </div>
        </div>
        <el-button round class="btn-main" style="font-size: 16px; height: 60px">Откликнуться</el-button>
        <div class="basic-block flex flex-col gap-[20px] text-sm" style="padding: 30px;">
            <span class="flex gap-2 items-center ">
                <SvgoEye style="width: 24px; height: 24px;"/>
                <p class="text-[16px]"><b>64 700</b> просмотров</p>
            </span>
            <span class="flex gap-2 items-center">
                <SvgoUndo style="width: 24px; height: 24px;"/>
                <nuxt-link href="t.me">
                    <span>
                        <p class="text-[16px]"><b>Поделиться</b></p>
                        <p class="text-[14px]">https://collaba.pro/u/britva</p>
                    </span>
                </nuxt-link>
            </span>
            <span class="flex gap-2 items-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g opacity="1">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M16 11H13V8C13 7.447 12.552 7 12 7C11.448 7 11 7.447 11 8V12C11 12.553 11.448 13 12 13H16C16.553 13 17 12.553 17 12C17 11.447 16.553 11 16 11ZM12 20C7.589 20 4 16.411 4 12C4 7.589 7.589 4 12 4C16.411 4 20 7.589 20 12C20 16.411 16.411 20 12 20ZM12 2C6.486 2 2 6.486 2 12C2 17.514 6.486 22 12 22C17.514 22 22 17.514 22 12C22 6.486 17.514 2 12 2Z" fill="black"/>
                    <mask id="mask0_691_5918" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="2" y="2" width="20" height="20">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M16 11H13V8C13 7.447 12.552 7 12 7C11.448 7 11 7.447 11 8V12C11 12.553 11.448 13 12 13H16C16.553 13 17 12.553 17 12C17 11.447 16.553 11 16 11ZM12 20C7.589 20 4 16.411 4 12C4 7.589 7.589 4 12 4C16.411 4 20 7.589 20 12C20 16.411 16.411 20 12 20ZM12 2C6.486 2 2 6.486 2 12C2 17.514 6.486 22 12 22C17.514 22 22 17.514 22 12C22 6.486 17.514 2 12 2Z" fill="white"/>
                    </mask>
                    <g mask="url(#mask0_691_5918)">
                    <rect width="100" height="100" fill="black"/>
                    </g>
                    </g>
                </svg>
                <p class="text-[16px]">Опубликовано 13.05.2025</p>
            </span>
            <span class="flex gap-2 items-center">
                <SvgoPeople style="width: 24px; height: 24px;"/>
                <p class="text-[16px]"><b>12 200</b> откликов</p>
            </span>
        </div>

    </div>
    <div class="w-full flex flex-col full-offer full-offer-content" >
        <img :src="OfferImg" alt="banner" class="w-full object-cover object-center lg:h-full rounded-xl">
        <div class="block-wrapper relative z-[3]]  mt-[-30px] lg:rounded[20px]" style="padding: 30px;" >
            <div class="flex items-center">
                <div class="flex items-center gap-2 w-full">
                    <el-avatar :size="48" :src="$images['avatar']" />
                    <div class="flex flex-col">
                    <span class="font-bold">Samsung TechnoFun</span>
                    <span class="text-[14px] opacity-40">Техника</span>
                    </div>
                </div>
                <nuxt-link href="/offer-create">
                    <SvgoArrowLeft style="rotate:180deg; width: 36px; height: 40px;"/>
                </nuxt-link>
            </div>
            <h1 class="text-[20px] font-extrabold mt-[20px]">Что предлагаем?</h1>
            <p class="text-[16px] opacity-60 mt-[5px] leading-[19px] tracking-[-0.2px]">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>

            <h1 class="text-[20px] font-extrabold mt-[20px] mb-[5px]">Условия сотрудничества</h1>
            <span class="el-tag el-tag--primary el-tag--light is-round dark"><span class="el-tag__content">Взаимно</span><!--v-if--></span>
            <span class="el-tag el-tag--primary el-tag--light is-round dark"><span class="el-tag__content">Бартер</span><!--v-if--></span>
            <h1 class="text-[20px] font-extrabold mt-[20px] mb-2">Приглашаем к сотрудничеству</h1>

            <p class="text-[14px] font-bold mt-3">Компании</p>
            <div class="flex flex-wrap gap-1 mt-2">
                <span class="el-tag el-tag--primary el-tag--light is-round dark active"><span class="el-tag__content">Красота и здоровье</span><!--v-if--></span>
                <span class="el-tag el-tag--primary el-tag--light is-round dark"><span class="el-tag__content">Стрижки</span><!--v-if--></span>
                <span class="el-tag el-tag--primary el-tag--light is-round dark"><span class="el-tag__content">Мода</span><!--v-if--></span>
                <span class="el-tag el-tag--primary el-tag--light is-round dark"><span class="el-tag__content">Путешествия</span><!--v-if--></span>
            </div>
            
            <p class="text-[14px] font-bold mt-3">Блогеры</p>
            <div class="flex flex-wrap gap-1 mt-2">
                <span class="el-tag el-tag--primary el-tag--light is-round dark"><span class="el-tag__content">Стрижки</span><!--v-if--></span>
                <span class="el-tag el-tag--primary el-tag--light is-round dark"><span class="el-tag__content">Мода</span><!--v-if--></span>
                <span class="el-tag el-tag--primary el-tag--light is-round dark"><span class="el-tag__content ">Красота и здоровье</span><!--v-if--></span>

            </div>
           <p class="text-[14px] font-bold mt-3">Проекты</p>
            <div class="flex flex-wrap gap-1 mt-2">
                <span class="el-tag el-tag--primary el-tag--light is-round dark"><span class="el-tag__content">Стрижки</span><!--v-if--></span>
                <span class="el-tag el-tag--primary el-tag--light is-round dark"><span class="el-tag__content">Мода</span><!--v-if--></span>
            </div>
            
            <h1 class="text-[20px] font-extrabold mt-[20px] mb-2">Требуемая ЦА</h1>
            <UICorrelation index-page />
          <div class="flex w-full flex-wrap gap-2 overflow-hidden rounded-2xl mt-3">
            <span class="flex w-full gap-2">
                <el-tag class="el-tag--primary el-tag--light is-round dark">18-25 лет</el-tag>
                <el-tag class="el-tag--primary el-tag--light is-round dark">35-45 лет</el-tag>
                <el-tag class="el-tag--primary el-tag--light is-round dark">Эконом сегмент</el-tag>
            </span>
            <span class="flex w-full">
                <el-tag class="el-tag--primary el-tag--light is-round dark">Средний сегмент</el-tag>
            </span>

            <h1 class="text-[20px] font-extrabold mt-[5px] mb-2">Фото / Видео</h1>
            <div class="basic-block w-full h-[270px] bg-grey bg-[#D9D9D9]"></div>
          </div>
        </div>
    </div>
    </div>
    
</template>

<script setup lang="ts">
import OfferImg from '~/assets/image/offer-banner.jpg'

import { useProfileStore } from '~/stores/profile.js'
import { useFiltersStore } from '~/stores/filters.js'
import Search from '~/assets/icons/search.svg'
const filtersStore = useFiltersStore()
const { profileInfo, audience, terms } = useProfileStore()
const inventories = [
  {
    name: 'telegram',
    peopleCount: '12.8M',
    viewCount: '488.7K',
    description: {
      subscribers: '12.8M',
      views: '488.7K',
      link: 'https://www.youtube.com/@BratishkinRof',
      er: '18.1%',
      promotion: [
        { title: 'RostRoll', description: 'Рекламный ролик от партнера в конце видео' },
        { title: 'RostRoll', description: 'Рекламный ролик от партнера в конце видео' },
        { title: 'RostRoll', description: 'Рекламный ролик от партнера в конце видео' }
      ]
    }
  },
  {
    name: 'instagram',
    peopleCount: '12.8M',
    viewCount: '488.7K',
    description: {
      subscribers: '12.8M',
      views: '488.7K',
      link: 'https://www.youtube.com/@BratishkinRof',
      er: '18.1%',
      promotion: [
        { title: 'RostRoll', description: 'Рекламный ролик от партнера в конце видео' },
        { title: 'RostRoll', description: 'Рекламный ролик от партнера в конце видео' },
        { title: 'RostRoll', description: 'Рекламный ролик от партнера в конце видео' }
      ]
    }
  },
  {
    name: 'youtube',
    peopleCount: '12.8M',
    viewCount: '488.7K',
    description: {
      subscribers: '12.8M',
      views: '488.7K',
      link: 'https://www.youtube.com/@BratishkinRof',
      er: '18.1%',
      promotion: [
        { title: 'RostRoll', description: 'Рекламный ролик от партнера в конце видео' },
        { title: 'RostRoll', description: 'Рекламный ролик от партнера в конце видео' },
        { title: 'RostRoll', description: 'Рекламный ролик от партнера в конце видео' }
      ]
    }
  }
]
</script>