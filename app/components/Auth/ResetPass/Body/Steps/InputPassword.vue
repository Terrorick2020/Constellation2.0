<template>

<UIInputBlock
    provider="password"
    :type="AUTH_INP_TYPE.password"
    :showPassword="true"
    :error="authStore.sInpErr.value"
    title="Придумайте пароль"
    :info="undefined"
    :postTitle="undefined"
    placeHolder="Введите пароль..."
    :svgType="'svgo-lock'"
  />

  <UIInputBlock
    provider="password"
    :type="AUTH_INP_TYPE.password"
    :showPassword="true"
    :error="authStore.sInpErr.value"
    title="Повторите пароль"
    :info="undefined"
    :postTitle="undefined"
    placeHolder="Введите пароль..."
    :svgType="'svgo-lock'"
  />

</template>

<script setup lang="ts">
import { ref, provide } from 'vue'
import { AUTH_INP_TYPE } from '~/constants/auth';
import { useAuthStore, isValidPassword } from '~/store/auth'


const authStore = useAuthStore()

const pass = ref('')
const repass = ref('')

provide( 'pass', pass )
provide( 'repass', repass )

watch(() => pass.value, (newValue) => {
  const [ res, ind ] = isValidPassword( newValue )

  authStore.fInpErr.value = !res
  authStore.fInpErr.index = ind

  if ( repass.value && repass.value !== newValue ) {
    authStore.password = ''

    authStore.sInpErr.value = true
    authStore.sInpErr.index = 1
  }
})
watch(() => repass.value, (newValue) => {
  authStore.sInpErr.value = newValue !== pass.value
  authStore.sInpErr.index = authStore.sInpErr.value ? 1 : null

  authStore.password = authStore.sInpErr.value ? ''  : pass.value 
})

</script>