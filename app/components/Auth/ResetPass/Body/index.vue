<template>
    <div class="sing-in__body flex flex-col gap-[20px]">
        <component :is="bodyStepsList[ props.step ]" />
    </div>
</template>

<script setup lang="ts">
import InputEmail from './Steps/InputUsername.vue'
import InputCode from './Steps/InputCode.vue'
import InputPassword from './Steps/InputPassword.vue'

const props = defineProps<{
  step: number,
}>()

const bodyStepsList = [
    InputEmail,
    InputCode,
    InputPassword
]
</script>