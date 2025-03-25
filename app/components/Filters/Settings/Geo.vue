<template>
  <div class="text-black first:!pt-0">
    <el-collapse accordion class="default !border-t-0">
      <el-collapse-item :name="1">
        <template #title>
          <div class="flex items-center gap-2 text-base font-bold text-black">
            ГЕО
            <span
              class="flex h-5 w-5 items-center justify-center rounded-full bg-main-gradient text-xs font-bold text-white"
              >{{ filtersStore.filters.geo.length }}</span
            >
          </div>
        </template>
        <geo-select v-bind:value="filtersStore.filters.geo"/>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script setup lang="ts">
import { useFiltersStore } from '~/stores/filters.js'

const activeNames = ref(['1'])

const filtersStore = useFiltersStore()
</script>
