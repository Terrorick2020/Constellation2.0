<template>
  <section class="main-block-wrapper">
    <h2 class="mb-5 text-2xl font-bold">Аудитория</h2>
    <div class="block-wrapper flex flex-col gap-[20px]">

      <div class="flex flex-col gap-2">
        <h3 class="text-sm opacity-70">ПОЛ</h3>
        <div v-if="audience.man && audience.woman" class="flex w-full overflow-hidden rounded-2xl">
          <div
            class="flex flex-col gap-1 bg-blue-man p-[15px] text-white"
            :style="{ minWidth: audience.man + '%' }"
          >
            <span class="text-sm font-light leading-none opacity-60">Мужчины</span>
            <span class="leading-none">{{ audience.man + '%' }}</span>
          </div>
          <div
            class="flex flex-col items-end gap-1 bg-main-gradient p-[15px] text-white"
            :style="{ minWidth: audience.woman + '%' }"
          >
            <span class="text-sm font-light leading-none opacity-60">Женщины</span>
            <span class="leading-none">{{ audience.woman + '%' }}</span>
          </div>
        </div>
        <div v-else>
          <h4 class="ml-1 text-sm opacity-70">Поле не задано</h4>
        </div>
      </div>

      <div class="h-[1px] w-[98%] bg-black/10"></div>
      <div class="flex flex-col gap-2">
        <h3 class="text-sm opacity-70">ВОЗРАСТ</h3>
        <div v-if="audience.age.length" class="flex w-full flex-wrap gap-2 overflow-hidden rounded-2xl">
          <el-tag v-for="item in audience.age" class="dark" :key="item.id" round>
            {{ item.name }} лет
          </el-tag>
        </div>
        <div v-else>
          <h4 class="ml-1 text-sm opacity-70">Поле не задано</h4>
        </div>
      </div>

      <div class="h-[1px] w-[98%] bg-black/10"></div>
      <div class="flex flex-col gap-2">
        <h3 class="text-sm opacity-70">ИНТЕРЕСЫ АУДИТОРИИ</h3>
        <div v-if="audience.interes_tags.length" class="flex w-full flex-wrap gap-2 overflow-hidden rounded-2xl">
          <el-tag v-for="item in audience.interes_tags" class="dark" :key="item.id" round>
            {{ item.name }}
          </el-tag>
        </div>
        <div v-else>
          <h4 class="ml-1 text-sm opacity-70">Поле не задано</h4>
        </div>
      </div>

      <div class="h-[1px] w-[98%] bg-black/10"></div>
      <div class="flex flex-col gap-2">
        <h3 class="text-sm opacity-70">СЕГМЕНТЫ</h3>
        <div  v-if="audience.segment_tags.length" class="flex w-full flex-wrap gap-2 overflow-hidden rounded-2xl">
          <el-tag v-for="item in audience.segment_tags" class="dark" :key="item.id" round>
            {{ item.name }}
          </el-tag>
        </div>
        <div v-else>
          <h4 class="ml-1 text-sm opacity-70">Поле не задано</h4>
        </div>
      </div>

      <div class="h-[1px] w-[98%] bg-black/10"></div>
      <div class="flex flex-col gap-2">
        <h3 class="text-sm opacity-70">ГЕО</h3>
        <div v-if="audience.geo_tags.length" class="flex w-full gap-2 overflow-hidden rounded-2xl">
          <el-tag v-for="item in audience.geo_tags" class="dark" :key="item.id" round>
            <div class="flex gap-1"><SvgoPin /> {{ item.name }}</div>
          </el-tag>
        </div>
        <div v-else>
          <h4 class="ml-1 text-sm opacity-70">Поле не задано</h4>
        </div>
      </div>

      <div class="h-[1px] w-[98%] bg-black/10"></div>
      <div class="flex flex-col gap-2">
        <h3 class="text-sm opacity-70">ОПИСАНИЕ ЦА</h3>
        <div v-if="audience.description" class="text-base">
          {{ audience.description }}
        </div>
        <div v-else>
          <h4 class="ml-1 text-sm opacity-70">Поле не задано</h4>
        </div>
      </div>

    </div>
  </section>
</template>
<script setup>
import { useProfileStore } from '~/stores/profile.ts'
const { audience } = useProfileStore()
</script>
