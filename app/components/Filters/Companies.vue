<!-- <template>
  <div class="flex flex-col gap-[15px] pt-[20px]">
    <span class="text-base font-bold text-black">Кого вы ищите?</span>
    <div class="flex flex-col gap-[10px]">
      <el-button
        round
        size="large"
        class="btn-grey left w-full !bg-white"
        v-for="item in companiesFilter"
        @click="filtersStore.filters.company_category = item.value"
      >
        <div class="flex w-full justify-between">
          <div class="relative text-sm font-bold">
            {{ item.label }}
            <div class="absolute -top-[2px] left-[105%] text-xs font-normal opacity-50">
              {{ item.count }}
            </div>
          </div>
          <div>
            <SvgoArrow class="rotate-90 transform text-xl" />
          </div>
        </div>
      </el-button>
    </div>
  </div>
</template>
<script setup>
import { useFiltersStore } from '~/stores/filters'

const filtersStore = useFiltersStore()
const companiesFilter = [
  {
    label: 'Компании',
    value: 'companies',
    count: '1674'
  },
  {
    label: 'Блогеры',
    value: 'blogers',
    count: '974'
  },
  {
    label: 'Проекты продюсеров',
    value: 'produsers',
    count: '123'
  }
]
</script> -->



<template>
  
</template>