<template>
  <div class="flex flex-col gap-[15px]">
    <component
      v-if="notNeedingLastContent"
      :is="componentList[step]"
      :basePath="`${props.basePath}.body[ ${step} ]`"
      :searchList="[...$tm(`${basePath}.body[ ${step} ].search`)]"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAuthStore } from '~/stores/auth'

import RadioFirst from './Steps/Radio/RadioFirst.vue'
import RadioSecond from './Steps/Radio/RadioSecond.vue'
import RadioThird from './Steps/Radio/RadioThird.vue'
import SelectList from './Steps/Select/index.vue'
import InputsFirst from './Steps/Input/InputsFirst.vue'
import InputsSecond from './Steps/Input/InputsSecond.vue'

const props = defineProps<{
  step: number
  basePath: string
}>()

const componentList = [RadioFirst, RadioSecond, RadioThird, SelectList, InputsFirst, InputsSecond]

const authStore = useAuthStore()

const notNeedingLastContent = computed(() => props.step < authStore.signUp.lastContentStep)
</script>
