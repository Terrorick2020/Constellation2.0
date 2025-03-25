<template>

  <UIAuthInput provider="pass"
              :type="AUTH_INP_TYPE.password"
              :showPassword="true"
              :error="isFInpErr"
              :title="'Придумайте новый пароль'"
              :postTitle="undefined"
              :placeHolder="'Введите пароль...'" 
              :svgType="'svgo-lock'" 
  />
  <AuthInfo v-if="isFInpErr" :text="$t( `${ props.basePath }.appErr.first[ ${ fInpErrInd } ]` )" />

  <UIAuthInput provider="repass"
              :type="AUTH_INP_TYPE.password"
              :showPassword="true"
              :error="isSInpErr"
              :title="'Повторите пароль'"
              :postTitle="undefined"
              :placeHolder="'Введите пароль...'"
              :svgType="'svgo-lock'"
  />
  <AuthInfo v-if="sInpErrInd" :text="$t( `${ props.basePath }.appErr.second[ ${ sInpErrInd } ]` )" />

</template>

<script setup lang="ts">
import { ref, provide } from 'vue'
import { AUTH_INP_TYPE } from '~/constants/auth';
import { useAuthStore, isValidPassword } from '~/stores/auth'


const props = defineProps<{
  basePath: string
}>()

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

const isFInpErr = computed( () => authStore.fInpErr.value )
const fInpErrInd = computed( () => authStore.fInpErr.index )

const isSInpErr = computed( () => authStore.sInpErr.value )
const sInpErrInd = computed( () => authStore.sInpErr.index )
</script>