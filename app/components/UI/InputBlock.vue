<template>
  <div class="w-full">
    <h6 class="headline">
      {{ props.title }}
      <span class="text-[#FF6C46]">*</span>
    </h6>
    
    <el-input
      :class="`h-[60px] w-full ${props.error ? 'error' : ''}`"
      style="margin-top: 0.3rem;"
      v-model="value"
      :type="type"
      :placeholder="props.placeHolder"
      :show-password="showPassword"
      :maxlength="props.maxLen ?? MAX_AUTH_INP_LEN"
    >
      <template #prefix v-if="props.svgType">
        <el-icon>
          <component :is="props.svgType" class="input-svg" />
        </el-icon>
      </template>
    </el-input>

    <UIInfo v-if="props.info" :text="props.info" />
  </div>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import { MAX_AUTH_INP_LEN } from '~/constants/auth'


const props = defineProps<{
  provider: string
  type: string
  showPassword: boolean
  title: string
  info: string | undefined
  placeHolder: string
  error: boolean
  svgType?: string
  maxLen?: number
}>()

const value: string | undefined = inject(props.provider)
</script>
