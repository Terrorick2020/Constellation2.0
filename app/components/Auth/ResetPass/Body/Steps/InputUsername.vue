<template>

  <UIAuthInput provider="username"
              :type="AUTH_INP_TYPE.text"
              :showPassword="false"
              :error="isFInpErr"
              :title="'Имя пользователя'"
              :postTitle="undefined"
              :placeHolder="'Введите username...'" 
              :svgType="'svgo-user'" 
  />
  <AuthInfo v-if="isFInpErr" :text="fInpErrMsg" />

</template>

<script setup lang="ts">
import { ref, provide } from 'vue'
import { AUTH_INP_TYPE } from '~/constants/auth'
import { useAuthStore, isValidUsername } from '~/stores/auth'


const usernameErr = [
  'Имя пользователя может содержать только латинские буквы, цифры, символы дефиса и нижнего подчёркивания!',
  'Имя пользователя должно быть длиной от 4х до 50ти символов!',
  'Такое имя уже занято!',
]

const authStore = useAuthStore()

const username = ref<string>('')

provide( 'username', username )

watch(() => username.value, (newValue) => {
  const [ res, ind ] = isValidUsername( newValue )

  authStore.fInpErr.value = !res
  authStore.fInpErr.index = ind

  authStore.username = newValue
})

const isFInpErr = computed( () => authStore.fInpErr.value )
const fInpErrMsg = computed( () => usernameErr[ authStore.fInpErr.index ] )

const mountedWriteInputs = async () => {
  username.value = authStore.username
}

onMounted(() => {
  mountedWriteInputs()
})
</script>