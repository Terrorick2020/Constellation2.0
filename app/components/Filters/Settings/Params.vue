<template>
  <div class="text-black first:!pt-0">
    <el-collapse accordion class="default !border-t-0">
      <el-collapse-item :name="1">
        <template #title>
          <div class="flex items-center gap-2 text-base font-bold text-black">
            Параметры ЦА
            <span
              class="flex h-5 w-5 items-center justify-center rounded-full bg-main-gradient text-xs font-bold text-white"
              >{{ filtersStore.filters.age.concat(filtersStore.filters.price).length }}</span
            >
          </div>
        </template>
        <div class="flex flex-col gap-4">
          <div class="flex flex-col">
            <span class="text-sm font-bold">Пол аудитории</span>
            <GenderSelect v-bind:value="man"/>
          </div>
          <div class="flex flex-col gap-3">
            <span class="text-sm font-bold">Возраст</span>
            <TagSelect v-bind:values="filtersStore.filters.age" :tags="AGE_GROUPS" />
          </div>
          <div class="flex flex-col gap-3">
            <span class="text-sm font-bold">Ценовой сегмент</span>
            <TagSelect v-bind:values="filtersStore.filters.price" :tags="PRICE_GROUPS" />
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script setup lang="ts">
import { useFiltersStore } from '~/stores/filters.js'
import {AGE_GROUPS, PRICE_GROUPS} from '~/constants/settings';

const man = ref(45)

const filtersStore = useFiltersStore()
</script>
