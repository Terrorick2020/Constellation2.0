<template>
    
    <UIInputBlock
      provider="email"
      :type="AUTH_INP_TYPE.text"
      :showPassword="false"
      :error="authStore.fInpErr.value"
      title="E-mail"
      :info="undefined"
      :postTitle="undefined"
      placeHolder="Введите e-mail..."
      :svgType="'svgo-dog'"
    />

</template>

<script setup lang="ts">
import { ref, provide } from 'vue'
import { useAuthStore } from '~/store/auth'
import { AUTH_INP_TYPE } from '~/constants/auth'


const authStore = useAuthStore()

const code = ref('')

provide( 'code', code )

watch(() => code.value, (newValue) => {

  authStore.code = authStore.fInpErr.value ? '' : newValue
})

</script>