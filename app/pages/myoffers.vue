<template>
<div class="flex flex-col w-full flex-col gap-[20px] pt-1 my-offers-container">
    <h1 class="text-2xl font-bold mt-2">Мои обьявления</h1>
    <div class="flex w-full gap-7">
        <div class="flex flex-col gap-3 w-full">
            <div id="my-offer-header" class="flex flex-wrap gap-4 w-[540px] h-[60px]">    
                <div class="basic-block cursor-pointer flex items-center w-full justify-start" style="padding-left: 10px;"><span class="flex gap-5" style="padding-left: 20px;"><span class="font-bold">Активные</span><span>Архивные</span></span></div>
                <Sort />

                <div id="balance-offer-mobile" class="flex flex-col gap-2 ">
                    <div class="offers-balance basic-block flex flex-col gap-4" style="padding:30px; max-height: 192px;">
                        <div class="flex flex-col gap-1">
                            <span class="font-bold text-xs">Баланс предложений</span>
                            <span class="font-bold text-2xl">12</span>
                        </div>

                        <el-button class="btn-classic w-full" style="border-radius: 200px;">Купить предложения</el-button>
                    </div>
                    <el-button round :icon="SVGPlus" class="btn-empty" style="font-weight: 900; background-color: rgb(244 244 244 / var(--tw-bg-opacity));">Новое предложение</el-button>
                </div>
            </div>
            <div class="offer-info basic-block bg-white flex flex-col gap-4">
                <div class="flex flex-col gap-2">
                    <h2 class="text-lg font-bold">Длинный заголовок моего замечательного<br> нового или старого предложения</h2>
                    <div class="flex gap-5">
                        <span class="text-sm"><b>12</b> дней осталось</span>
                        <span class="text-sm"><b>123123</b> откликов</span>
                        <span class="text-sm"><b>123123</b> просмотров</span>
                    </div>
                </div>
                <div>
                    <el-button round :icon="SVGEdit" class="btn-empty" style="font-weight: 900;">Редактировать</el-button>
                    <el-button round class="btn-empty is-circle"><SvgoLink/></el-button>
                </div>
            </div>
            <div class="offer-info basic-block bg-white flex flex-col gap-4 justify-between">
                <div class="flex flex-col gap-2">
                    <h2 class="text-lg font-bold">Длинный заголовок моего замечательного<br> нового или старого предложения</h2>
                    <div class="flex gap-5">
                        <span class="text-sm"><b>12</b> дней осталось</span>
                        <span class="text-sm"><b>123123</b> откликов</span>
                        <span class="text-sm"><b>123123</b> просмотров</span>
                    </div>
                </div>
                <div>
                    <el-button round :icon="SVGEdit" class="btn-empty" style="font-weight: 900;">Редактировать</el-button>
                    <el-button round class="btn-empty is-circle"><SvgoLink/></el-button>
                </div>
            </div>
            <div class="offer-info basic-block bg-white  flex flex-col gap-4">
                <div class="flex flex-col gap-2">
                    <h2 class="text-lg font-bold">Длинный заголовок моего замечательного<br> нового или старого предложения</h2>
                    <div class="flex gap-5">
                        <span class="text-sm"><b>12</b> дней осталось</span>
                        <span class="text-sm"><b>123123</b> откликов</span>
                        <span class="text-sm"><b>123123</b> просмотров</span>
                    </div>
                </div>
                <div>
                    <el-button round :icon="SVGEdit" class="btn-empty" style="font-weight: 900;">Редактировать</el-button>
                    <el-button round class="btn-empty is-circle"><SvgoLink/></el-button>
                </div>
            </div>
        </div>
        <div id="balance-offer" class="flex flex-col gap-2" >
            <div class="basic-block w-[345px] flex flex-col gap-4" style="padding:30px; max-height: 192px;">
                <div class="flex flex-col gap-1">
                    <span class="font-bold text-xs">Баланс предложений</span>
                    <span class="font-bold text-2xl">12</span>
                </div>

                <el-button class="btn-classic w-full" style="border-radius: 200px;">Купить предложения</el-button>
            </div>
            <el-button round :icon="SVGPlus" class="btn-empty" style="font-weight: 900; background-color: rgb(244 244 244 / var(--tw-bg-opacity));">Новое предложение</el-button>
        </div>
    </div>
</div>
</template>

<script setup lang="ts">
import SVGEdit from '@/assets/icons/edit.svg'
import SVGPlus from '@/assets/icons/plus.svg'
</script>
