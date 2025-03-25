<template>
  <section class="main-block-wrapper">
    <h2 class="text-2xl font-bold mb-5">Условия сотрудничества</h2>
    <div v-if="terms.tags.length" class="flex flex-wrap gap-1">
      <el-tag v-for="item in terms.tags" :key="item.id" round>
        <div class="flex gap-2 items-center">
          <component
            :is="`svgo-${item.icon_name}`"
            class="w-5 h-5 text-[#ff6c46]"
            :fontControlled="false"
          />
          {{ item.name }}
        </div>
      </el-tag>
    </div>
    <div v-else>
      <h4 class="ml-1 text-md opacity-70">Условия не заданы</h4>
    </div>
  </section>
</template>
<script setup>
import { useProfileStore } from '~/stores/profile.ts'
const { terms } = useProfileStore()
</script>
