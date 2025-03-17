<template>
    <div class="sing-in__body flex flex-col gap-[20px]">
        <AuthResetPassBodyStepsInputCode
            v-if="props.step === RPContentStep.CodeStep"
        />
        <AuthResetPassBodyStepsInputPassword
            v-else-if="props.step === RPContentStep.RewritePassStep"
        />
    </div>
</template>

<script setup lang="ts">
import { RPContentStep } from '~/types/auth/reset-pass'


const props = defineProps<{
  step: number,
  basePath: string
}>()
</script>