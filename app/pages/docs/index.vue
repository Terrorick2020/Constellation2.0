<template>
  <div class="flex w-full flex-col">
    <div class="mb-5 flex flex-col gap-[10px] lg:flex-row">
      <el-input
        v-model="searchQuery"
        size="large"
        placeholder="Поиск по названию и др...."
        class="h-[60px] max-w-full lg:max-w-[835px]"
      >
        <template #prefix>
          <SvgoSearch filled class="h-6 w-[30px]" :font-controlled="false" />
        </template>
      </el-input>
      <div class="flex items-center gap-x-[10px] grow">
        <Filters />
        <Sort />
      </div>
    </div>

    <div class="space-y-[100px]">
      <div class="flex w-full flex-col gap-[10px]" v-for="companyIndex in 5">
        <!-- Here keep document info -->
        <Company index-page /> 
        <div class="border border-black/15 p-4 flex flex-col gap-y-[20px] bg-white rounded-2xl">
          <div class="flex flex-col gap-[10px]">
            <h2 class="text-xs font-extrabold text-black/50 uppercase leading-[110%]">Количество людей, подписавших документ</h2>
            <div class="demo-progress">
              <el-progress
                :percentage="percentage"
                :stroke-width="15"
                status="success"
                striped
                striped-flow 
                :duration="duration"
                :text-inside="true"
                color="#409EFF"
              />
              <!-- <el-button-group>
                <el-button :icon="Minus" @click="decrease" />
                <el-button :icon="Plus" @click="increase" />
              </el-button-group> -->
            </div>
            <!-- Количество подписавших -->
            <p class="text-sm text-gray-500">Подписали: {{ 50 }} из {{ 100 }}</p> 
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Minus, Plus } from '@element-plus/icons-vue'
import { useProfileStore } from '~/stores/profile.js'
import { useFiltersStore } from '~/stores/filters.js'

const percentage = ref<number>(50) // Начальный процент
const searchQuery = ref(''); // Строка поиска

const duration = computed(() => Math.floor(percentage.value / 5)) // Длительность анимации

const increase = () => {
  percentage.value += 1
  if (percentage.value > 100) {
    percentage.value = 100
  }
}

const decrease = () => {
  percentage.value -= 1
  if (percentage.value < 0) {
    percentage.value = 0
  }
}

useSeoMeta({
  title: 'Приказы и приказания',
  ogTitle: 'Приказы и приказания',
  description: 'Страница приказов и приказаний',
  ogDescription: 'Страница приказов и приказаний',
})


</script>

<style scoped>
.demo-progress .el-progress--line {
  margin-bottom: 15px;
  max-width: 600px;
  border: 2px solid black;
  border-radius: 15px;
}
</style>
