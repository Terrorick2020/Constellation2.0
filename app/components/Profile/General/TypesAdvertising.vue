<template>
  <div class="flex flex-col">
    <span class="mb-[15px] text-sm font-bold">Вид рекламы:</span>
    <div
      v-for="promotion in promotions"
      class="flex items-center justify-between border-t-[1px] border-main-border py-[15px]"
    >
      <div class="flex flex-col gap-[5px] pr-[24px]">
        <span class="text-sm font-bold">{{ promotion.title }}</span>
        <p class="text-sm opacity-40">{{ promotion.description }}</p>
      </div>
      <el-checkbox size="large" />
    </div>
  </div>
</template>
<script setup lang="ts">
import type { TypesAdverstingsPropsType } from '~/types/profile/inventory.ts'

const props = withDefaults(defineProps<TypesAdverstingsPropsType>(), {
  promotions: () => []
})
</script>
