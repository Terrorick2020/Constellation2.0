<template>

  <UIAuthInput provider="name"
              :type="AUTH_INP_TYPE.text"
              :showPassword="false"
              :error="isFInpErr"
              :title="companyNameContent.title"
              :postTitle="undefined"
              :placeHolder="companyNameContent.placeholder"
  />
  <AuthInfo v-if="isFInpErr" :text="$t(`${ props.basePath }.appErr.first[ ${ fInpErrInd } ]`)" />

  <UIAuthInput provider="url"
              :type="AUTH_INP_TYPE.text"
              :showPassword="false"
              :error="isSInpErr"
              :title="companyUrlContent.title"
              :postTitle="companyUrlContent.prePlaceholder"
              :placeHolder="companyUrlContent.placeholder"
  />
  <AuthInfo v-if="isSInpErr" :text="$t(`${ props.basePath }.appErr.second[ ${ sInpErrInd } ]`)" />
  
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'
import { useProfileStore } from '~/stores/profile'
import { AUTH_INP_TYPE } from '~/constants/auth'
import { isValidProfileName, isValidProfileUrl } from '~/stores/profile'

import type { InputItem } from '~/types/auth/sign-up'


const props = defineProps<{
  basePath: string
  searchList: InputItem[]
}>()

const authStore = useAuthStore()
const profileStore = useProfileStore()

const companyNameContent = props.searchList[0]
const companyUrlContent = props.searchList[1]

const name = ref( '' )
const url = ref( '' )

provide( 'name', name )
provide( 'url', url )

watch(() => name.value, ( newValue ) => {
  const resValid = isValidProfileName( newValue )

  authStore.fInpErr.value = !resValid[0]
  authStore.fInpErr.index = resValid[1]

  profileStore.companyName = authStore.fInpErr.value ? '' : newValue
})
watch(() => url.value, (newValue) => {
  const resValid = isValidProfileUrl( newValue )

  authStore.sInpErr.value = !resValid[0]
  authStore.sInpErr.index = resValid[1]

  profileStore.companyUrl = authStore.sInpErr.value ? '' : newValue
})

const isFInpErr = computed( () => authStore.fInpErr.value )
const fInpErrInd = computed( () => authStore.fInpErr.index )

const isSInpErr = computed( () => authStore.sInpErr.value )
const sInpErrInd = computed( () => authStore.sInpErr.index )

const mountedWriteInputs = async () => {
  name.value = profileStore.companyName
  url.value = profileStore.companyUrl
}

onMounted(() => {
  mountedWriteInputs()
})
</script>
