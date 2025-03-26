<template>
  <div class="sing-in__body flex flex-col gap-[20px]">
    <UIAuthInput
      provider="username"
      :type="AUTH_INP_TYPE.text"
      :showPassword="false"
      :error="authStore.fInpErr.value"
      :title="'Имя пользователя'"
      :postTitle="undefined"
      :placeHolder="'Введите username...'"
      :svgType="'svgo-user'"
    />

    <UIAuthInput
      provider="password"
      :type="AUTH_INP_TYPE.password"
      :showPassword="true"
      :error="authStore.sInpErr.value"
      :title="'Пароль'"
      :postTitle="undefined"
      :placeHolder="'Введите пароль...'"
      :svgType="'svgo-lock'"
    />

    <div class="body-search flex flex-row justify-between">
      <el-checkbox class="ml-1" v-model="saveMe">Сохранить вход</el-checkbox>
      <a class="mt-1" :href="`${resetPassRoute}`">Забыли пароль?</a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, provide } from 'vue'
import { AUTH_INP_TYPE } from '~/constants/auth'
import { useAuthStore, isValidUsername } from '~/stores/auth'
import { lenPassword, lenUsername } from '~/env/auth.env'
import { clientRoutes } from '~/env/routes.env'


const authStore = useAuthStore()

const mainRoute = clientRoutes.auth.main
const resetPassRoute = mainRoute + clientRoutes.auth.local.resetPass

const username = ref<string>( '' )
const password = ref<string>( '' )
const saveMe = ref<boolean>( false )

provide('username', username)
provide('password', password)

watch(
  () => username.value,
  (newValue) => {
    authStore.fInpErr.value = newValue.length < lenUsername.min || newValue.length > lenUsername.max
    authStore.username = !authStore.fInpErr.value ? newValue : ''
  }
)
watch(
  () => password.value,
  (newValue) => {
    authStore.sInpErr.value = password.value.length < lenPassword.min || password.value.length > lenPassword.max
    authStore.password = !authStore.sInpErr.value ? newValue : ''
  }
)
watch(
  () => saveMe.value,
  (newValue) => {
    authStore.saveMe = newValue
  }
)
</script>
