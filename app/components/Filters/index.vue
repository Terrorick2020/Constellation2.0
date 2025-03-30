<!-- <template>
  <div class="relative grow">
    <UIButton
      ref="filterBtn"
      icon-name="options"
      full
      :class="{ 'bg-white': filterVisible }"
      :counter="filtersStore.allArrays.length"
      @click="filterVisible = !filterVisible"
    >
      Фильтры
    </UIButton>
    <UIModal v-model="filterVisible" :target-ref="filterBtn" width="430">
      <template #title>
        <div class="flex flex-col">
          <div class="flex gap-1" v-if="filtersStore.filters.company_category">
            <span class="text-sm leading-none opacity-60">
              {{
                category_state[filtersStore.filters.company_category as keyof typeof category_state]
              }}
            </span>

            <SvgoClose filled class="cursor-pointer text-sm" @click="filtersStore.resetFilters" />
          </div>
          <div class="text-base font-bold text-black">Фильтры</div>
        </div>
      </template>
      <FiltersCompanies v-if="!filtersStore.filters.company_category" />
      <FiltersSettings v-else />
    </UIModal>
  </div>
</template>

<script setup lang="ts">
import type { ButtonInstance } from 'element-plus'
import { useFiltersStore } from '~/stores/filters'

const filtersStore = useFiltersStore()
const filterVisible = ref(false)
const filterBtn = ref<ButtonInstance>()

const category_state = {
  companies: 'Компании',
  blogers: 'Блогеры',
  produsers: 'Проекты продюсеров'
}

const companiesFilter = {
  companies: {
    label: 'Компании',
    value: 'companies',
    count: '1674'
  },
  blogers: {
    label: 'Блогеры',
    value: 'blogers',
    count: '974'
  },
  produsers: {
    label: 'Проекты продюсеров',
    value: 'produsers',
    count: '123'
  }
}
</script> -->


<template>
  
</template>