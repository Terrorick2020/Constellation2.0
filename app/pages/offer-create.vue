<template>
    <div class="flex flex-line flex-row-reverse flex-wrap w-full gap-[30px] full-offer-block">
        <div class="flex flex-col gap-3 full-offer full-offer-nav">
            <div class=" basic-block bg-white flex flex-col gap-4  ">
            <h2 class="text-[20px] font-bold">Длинный заголовок моего замечательного нового или старого обьявления</h2>
            <div class="w-full flex flex-col gap-3">
                <span class="w-full flex ">
                    <el-button round class="w-full btn-empty">Приостановить</el-button>
                    <el-button round class="is-circle btn-empty"><SvgoArchive/></el-button>
                </span>

                <el-button round class="font-bold btn-empty">Разместить повторно</el-button>
            </div>
        </div>
        <div class="basic-block flex flex-col gap-3 text-sm">
            <span class="flex gap-2 items-center ">
                <SvgoEye/>
                <p><b>64 700</b> просмотров</p>
            </span>
            <span class="flex gap-2 items-center">
                <SvgoUndo/>
                <span>
                    <p><b>Поделиться</b></p>
                    <p class="text-xs">https://collaba.pro/u/britva</p>
                </span>
            </span>
            <span class="flex gap-2 items-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                <p>Опубликовано 13.05.2025</p>
            </span>
            <span class="flex gap-2 items-center">
                <SvgoPeople/>
                <p><b>12 200</b> откликов</p>
            </span>
        </div>
        </div>
        <div class="w-full mt-2 flex flex-col full-offer full-offer-content">
            <div class="basic-block relative z-[3]]" style="padding: 20px;" >
                <h2 class="text-[20px] font-bold">Редактирование обьявления</h2>
                <h1 class="text-[16px] font-bold mt-3 mb-2">Заголовок*</h1>
                <div class="el-input el-input--large el-input--prefix"><!-- input --><!-- prepend slot --><!--v-if--><div class="el-input__wrapper" tabindex="-1"><!-- prefix slot --><span class="el-input__prefix"><span class="el-input__prefix-inner"><i class="el-icon el-input__icon"></i></span></span><input class="el-input__inner" type="text" autocomplete="off" tabindex="0" placeholder="Заголовок моего обьявления"  value="Заголовок моего прекрасного обьявления " id="el-id-1024-9"><!-- suffix slot --><!--v-if--></div><!-- append slot --><!--v-if--></div>
                <span class="flex flex-col gap-0 mt-3">
                    <h2 class="text-[16px] font-bold mt-3">Обложка*</h2>
                    <p class="text-[14px] opacity-50">Рекомендуемый размер 512x512px. Доступные форматы: png, jpeg</p>
                </span>
                <el-button round class="w-full btn-grey" style="border-radius: 50px; margin-top: 20px;">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M5 4H19C19.55 4 20 4.45 20 5V7C20 7.55 19.55 8 19 8C18.45 8 18 7.55 18 7V6H6V7C6 7.55 5.55 8 5 8C4.45 8 4 7.55 4 7V5C4 4.45 4.45 4 5 4ZM8.001 14C7.696 14 7.397 13.862 7.2 13.6C6.868 13.158 6.958 12.531 7.4 12.2L11.4 9.2C11.746 8.94 12.222 8.933 12.575 9.182L16.575 11.996C17.027 12.314 17.136 12.938 16.818 13.389C16.5 13.84 15.877 13.95 15.425 13.632L12.9972 11.9241C12.999 11.9492 13 11.9745 13 12V20C13 20.552 12.553 21 12 21C11.447 21 11 20.552 11 20V12.0002L8.6 13.8C8.42 13.935 8.21 14 8.001 14Z" fill="black"/>
                        <mask id="mask0_691_6146" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="4" y="4" width="16" height="17">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M5 4H19C19.55 4 20 4.45 20 5V7C20 7.55 19.55 8 19 8C18.45 8 18 7.55 18 7V6H6V7C6 7.55 5.55 8 5 8C4.45 8 4 7.55 4 7V5C4 4.45 4.45 4 5 4ZM8.001 14C7.696 14 7.397 13.862 7.2 13.6C6.868 13.158 6.958 12.531 7.4 12.2L11.4 9.2C11.746 8.94 12.222 8.933 12.575 9.182L16.575 11.996C17.027 12.314 17.136 12.938 16.818 13.389C16.5 13.84 15.877 13.95 15.425 13.632L12.9972 11.9241C12.999 11.9492 13 11.9745 13 12V20C13 20.552 12.553 21 12 21C11.447 21 11 20.552 11 20V12.0002L8.6 13.8C8.42 13.935 8.21 14 8.001 14Z" fill="white"/>
                        </mask>
                        <g mask="url(#mask0_691_6146)">
                        </g>
                    </svg>
                        Загрузить
                </el-button>
                <h2 class="text-[16px] font-bold mt-4">Дата окончания*</h2>
                <div class="el-input el-input--large el-input--prefix mt-2"><!-- input --><!-- prepend slot --><!--v-if--><div class="el-input__wrapper" tabindex="-1"><!-- prefix slot --><span class="el-input__prefix"><span class="el-input__prefix-inner"><i class="el-icon el-input__icon"></i></span></span><input class="el-input__inner" type="text" autocomplete="off" tabindex="0" placeholder="00.00.00 в 00:00"  value="00.00.00 в 00:00 " id="el-id-1024-9"><!-- suffix slot --><!--v-if--></div><!-- append slot --><!--v-if--></div>
                <h2 class="text-[16px] font-bold mt-4">Условия сотрудничества*</h2>
                <span class="flex flex-wrap gap-1 mt-2">
                    <span class="el-tag el-tag--primary el-tag--light is-round"><span class="el-tag__content">Платно</span><!--v-if--></span>
                    <span class="el-tag el-tag--primary el-tag--light is-round bg-main-gradient"><span class="el-tag__content" style="color:white">Взаимно</span><!--v-if--></span>
                    <span class="el-tag el-tag--primary el-tag--light is-round bg-main-gradient"><span class="el-tag__content" style="color:white">Бартер</span><!--v-if--></span>
                </span>
                <span>
                    <h2 class="text-[16px] font-bold mt-4">Что предлагаем?*</h2>
                    <textarea name="" id="" class="basic-block w-full mt-3" style="height: 170px;" placeholder="Введите описание..."></textarea>
                    <p class="text-[14px] opacity-50">Осталось символов: <b>512</b></p>
                </span>
                <span>
                    <h2 class="text-[16px] font-bold mt-4">Фото и видео</h2>
                    <p class="text-[14px] opacity-50">Доступные форматы: mp4</p>
                    <span class="flex w-full gap-3 mt-3">
                        <div class="basic-block p-[50px]" style="width: 124px; height: 124px; padding: 50px;">
                            <SvgoPlus/>
                        </div>
                        <div class="basic-block" style="width: 124px; height: 124px; padding: 50px;">
                        </div>
                        <div class="basic-block" style="width: 124px; height: 124px; padding: 50px;">
                        </div>
                    </span>
                </span>
                <el-form class="flex min-h-[600px] w-full flex-col ">
                    <span class="settings-title mb-[10px]">Портрет клиентов</span>
                    <span class="settings-subtitle">Опишите рекальный профиль клиентов вашего бизнеса</span>
                        
                    <span class="font-bold">ГЕО</span>
                    <el-form-item prop="common.location" label="Где находится бизнес Ваших клиентов?" label-width="16" label-position="top" hide-require-asterisk>
                        <GeoSelect v-bind:value="store.clientsPortrain.geo"/>
                        <SwitchSelect label="Вся Россия" v-bind:value="store.clientsPortrain.wholeRussia"/>
                    </el-form-item>
                    
                    <span class="font-bold">Пол аудитории</span>
                    <el-form-item prop="clientsPortrain.man" label-width="16" label-position="top" hide-require-asterisk>
                        <GenderSelect class="w-full" v-bind:value="store.clientsPortrain.man"/>
                    </el-form-item>
                    
                    <span class="font-bold mb-[10px]">Возраст</span>
                    <el-form-item prop="clientsPortrain.age" label-width="16" label-position="top" hide-require-asterisk>
                        <TagSelect v-bind:values="store.clientsPortrain.age" :tags="AGE_GROUPS" />
                    </el-form-item>
                    
                    <span class="font-bold mb-[10px]">Интересы аудитории</span>
                    <el-form-item prop="clientsPortrain.scopeActivity" label-width="16" label-position="top" hide-require-asterisk>
                        <bussiness-sphere-select v-bind:value="store.clientsPortrain.scopeActivity"/>
                    </el-form-item>
                    
                    <span class="font-bold mb-[10px]">В каком сегменте рынка вы работаете</span>
                    <el-form-item prop="clientsPortrain.price" label-width="16" label-position="top" hide-require-asterisk>
                        <TagSelect v-bind:values="store.clientsPortrain.price" :tags="PRICE_GROUPS" />
                    </el-form-item>

                    <span class="font-bold pb-[10px]">Точное описание</span>
                    <el-form-item prop="clientsPortrain.description" label="В свободной форме опишите ядро и потребности аудитории, так как вас будет найти проще" label-width="16" label-position="top" hide-require-asterisk>
                        <el-input type="textarea" placeholder="Введите описание..." size="large" v-model="store.clientsPortrain.description"/>
                        <div class="text-xs mt-[10px]">
                            <span class="opacity-40">Осталось символов: </span>
                            <span class="font-bold">{{ descriptionWidth }}</span>
                        </div>
                    </el-form-item>

                    <el-button round class="btn-main">Сохранить</el-button>
                </el-form>

            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useSettingsStore } from '~/stores/settings'
import {MAX_DESCRIPTION_WIDTH, AGE_GROUPS, PRICE_GROUPS} from '~/constants/settings';

const store = useSettingsStore();

const descriptionWidth = ref(MAX_DESCRIPTION_WIDTH - store.common.description.length);

</script>