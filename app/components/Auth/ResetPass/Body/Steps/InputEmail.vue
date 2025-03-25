<template>

  <UIAuthInput provider="email"
              :type="AUTH_INP_TYPE.text"
              :showPassword="false"
              :error="isFInpErr"
              :title="$t( `${ props.basePath }.search[0].title` )"
              :postTitle="undefined"
              :placeHolder="$t( `${ props.basePath }.search[0].placeholder` )" 
              :svgType="'svgo-email'" 
  />
  <AuthInfo v-if="isFInpErr" :text="$t( `${ props.basePath }.appErr.first[ ${ fInpErrInd } ]` )" />

</template>

<script setup lang="ts">
import { ref, provide } from 'vue'
import { AUTH_INP_TYPE } from '~/constants/auth'
import { useAuthStore, isValidEmail } from '~/stores/auth'


const props = defineProps<{
  basePath: string
}>()

const authStore = useAuthStore()

const email = ref('')

provide( 'email', email )

watch(() => email.value, (newValue) => {
  authStore.fInpErr.value = !isValidEmail( newValue )
  authStore.fInpErr.index = authStore.fInpErr.value ? 1 : null

  authStore.email = authStore.fInpErr.value ? '' : newValue
})

const isFInpErr = computed( () => authStore.fInpErr.value )
const fInpErrInd = computed( () => authStore.fInpErr.index )

const mountedWriteInputs = async () => {
  email.value = authStore.email
}

onMounted(() => {
  mountedWriteInputs()
})
</script>