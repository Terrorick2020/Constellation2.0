<template>
  <div class="w-full">
    <h2 class="title-min">
      {{ props.title }}
      <span class="ml-[1px] text-[#FF6C46]">*</span>
    </h2>
    <p class="description mt-[5px]" v-if="props.postTitle">{{ props.postTitle }}</p>
    <el-input
      :class="`mt-[5px] h-[60px] w-full ${error ? 'error' : ''}`"
      v-model="value"
      :type="type"
      :placeholder="props.placeHolder"
      :show-password="showPassword"
      :maxlength="props.maxLen ?? MAX_AUTH_INP_LEN"
    >
      <template #prefix v-if="props.svgType">
        <el-icon class="el-input__icon">
          <component :is="props.svgType" class="input-svg" />
        </el-icon>
      </template>
    </el-input>
  </div>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import { MAX_AUTH_INP_LEN } from '~/constants/auth'


const props = defineProps<{
  provider: string
  type: string
  showPassword: boolean
  error: boolean
  title: string
  postTitle: string | undefined
  placeHolder: string
  svgType?: string
  maxLen?: number
}>()

const value: string | undefined = inject(props.provider)
</script>
