<template>

  <UIAuthInput provider="email"
              :type="AUTH_INP_TYPE.text"
              :showPassword="false"
              :error="isFInpErr"
              :title="userEmailContent.title"
              :postTitle="undefined"
              :placeHolder="userEmailContent.placeholder" 
              :svgType="'svgo-dog'" 
  />
  <AuthInfo v-if="isFInpErr" :text="$t(`${ props.basePath }.appErr.first[ ${ fInpErrInd } ]`)" />

  <UIAuthInput provider="pass"
              :type="AUTH_INP_TYPE.password"
              :showPassword="true"
              :error="isSInpErr"
              :title="userPassContent.title"
              :postTitle="undefined"
              :placeHolder="userPassContent.placeholder" 
              :svgType="'svgo-lock'"
  />
  <AuthInfo v-if="isSInpErr" :text="$t(`${ props.basePath }.appErr.second[ ${ sInpErrInd } ]`)" />

  <UIAuthInput provider="repass"
              :type="AUTH_INP_TYPE.password"
              :showPassword="true"
              :error="isTInpErr"
              :title="userRepassContent.title"
              :postTitle="undefined"
              :placeHolder="userRepassContent.placeholder" 
              :svgType="'svgo-lock'"
  />
  <AuthInfo v-if="isTInpErr" :text="$t(`${ props.basePath }.appErr.third[ ${ tInpErrInd } ]`)" />

  <div class="info-block w-full">
    <p class="info-block__text description w-full">
      {{ $t(`${ props.basePath }.info.text`) }}
      <nuxtLink class="link" :to="privacyRoute">{{ $t(`${ props.basePath }.info.fLink`) }}</nuxtLink>
      {{ $t(`${ props.basePath }.info.sep`) }}
      <nuxtLink class="link" :to="rulesRoute">{{ $t(`${ props.basePath }.info.sLink`) }}</nuxtLink>
    </p>
  </div>

</template>

<script setup lang="ts">
import { AUTH_INP_TYPE } from '~/constants/auth'
import { clientRoutes } from '~/env/routes.env'
import {
  useAuthStore,
  isValidEmail,
  isValidPassword
} from '~/stores/auth'

import type { InputItem } from '~/types/auth/sign-up'


const props = defineProps<{
  basePath: string
  searchList: InputItem[]
}>()

const authStore = useAuthStore()

const privacyRoute = clientRoutes.privacy
const rulesRoute = clientRoutes.rules

const userEmailContent = props.searchList[0]
const userPassContent = props.searchList[1]
const userRepassContent = props.searchList[2]

const email = ref( '' )
const pass = ref( '' )
const repass = ref( '' )

provide( 'email', email )
provide( 'pass', pass )
provide( 'repass', repass )

watch(() => email.value, (newValue) => {
  authStore.fInpErr.value = !isValidEmail( newValue )
  authStore.fInpErr.index = authStore.fInpErr.value ? 1 : null

  authStore.email = authStore.fInpErr.index ? '' : newValue
})
watch(() => pass.value, (newValue) => {
  const [ res, ind ] = isValidPassword( newValue )

  authStore.sInpErr.value = !res
  authStore.sInpErr.index = ind

  if ( repass.value && repass.value !== newValue ) {
    authStore.tInpErr.value = true
    authStore.tInpErr.index = 1
  }

  authStore.password = newValue
})
watch(() => repass.value, (newValue) => {
  authStore.tInpErr.value = newValue !== pass.value
  authStore.tInpErr.index = authStore.tInpErr.value ? 1 : null

  authStore.repass = newValue
})

const isFInpErr = computed( () => authStore.fInpErr.value )
const fInpErrInd = computed( () => authStore.fInpErr.index )

const isSInpErr = computed( () => authStore.sInpErr.value )
const sInpErrInd = computed( () => authStore.sInpErr.index )

const isTInpErr = computed( () => authStore.tInpErr.value )
const tInpErrInd = computed( () => authStore.tInpErr.index )

const mountedWriteInputs = async () => {
  email.value = authStore.email
  pass.value = ''
  repass.value = ''

  authStore.sInpErr.value = false
  authStore.sInpErr.index = null

  authStore.tInpErr.value = false
  authStore.tInpErr.index = null
}

onMounted(() => {
  mountedWriteInputs()
})
</script>
