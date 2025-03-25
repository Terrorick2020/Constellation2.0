<template>
    <div class="w-full flex flex-row items-center">
      <el-icon class="ml-1" :size="12" style="color: #f87171">
        <CircleCloseFilled />
      </el-icon>
      <p class="ml-2 text-red-400">{{ props.text }}</p>
    </div>
</template>

<script setup lang="ts">
import { CircleCloseFilled } from '@element-plus/icons-vue'

const props = defineProps<{
  text: string
}>()
</script>