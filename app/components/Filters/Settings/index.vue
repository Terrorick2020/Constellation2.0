<template>
  <div class="max-h-[340px] overflow-y-auto lg:max-h-[480px]">
    <FiltersSettingsGeo />
    <FiltersSettingsScopeActivity />
    <FiltersSettingsParams />
  </div>

  <div class="flex flex-col gap-2 pt-5">
    <div>
      <el-button round size="large" class="btn-main long fill-none !px-[54px] !text-[10xp]">
        Показать
      </el-button>
    </div> 
    <div>
      <el-button
        round
        size="large"
        class="btn-empty w-full fill-none !px-[54px] !text-[10xp]"
        @click="filtersStore.resetFilters"
      >
        Сбросить
      </el-button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useFiltersStore } from '~/stores/filters'

const filtersStore = useFiltersStore()
</script>
