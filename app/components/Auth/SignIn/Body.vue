<template>
  <div class="flex flex-col gap-[1.2rem]">
    <UIInputBlock
      provider="username"
      :type="AUTH_INP_TYPE.text"
      :showPassword="false"
      title="Название аккаунта"
      :error="props.userNameErr"
      :info="undefined"
      :postTitle="undefined"
      placeHolder="Введите username..."
      :svgType="'svgo-dog'"
    />

    <UIInputBlock
      provider="password"
      :type="AUTH_INP_TYPE.password"
      :showPassword="true"
      title="Пароль"
      :error="props.passErr"
      :info="undefined"
      :postTitle="undefined"
      placeHolder="Введите пароль..."
      :svgType="'svgo-lock'"
    />

    <div class="body-search flex flex-row justify-between">
      <el-checkbox class="large" style="margin-left: 0.2rem;" v-model="saveMe">Сохранить вход</el-checkbox>
      <NuxtLink class="mt-1" :to="`${resetPassRoute}`">Забыли пароль?</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  AUTH_INP_TYPE,
  MIN_USER_NAME_LEN,
  MAX_USER_NAME_LEN,
  MIN_PASS_INP_LEN,
  MAX_PASS_INP_LEN,
} from '~/constants/auth'
import { useAuthStore } from '~/store/auth'
import { clientRoutes } from '~/env/routes.env'

const props = defineProps<{
  userNameErr: boolean
  setUserNameErr: ( value: boolean ) => void
  passErr: boolean
  setPassErr: ( value: boolean ) => void
}>()

const authStore = useAuthStore()

const mainRoute = clientRoutes.auth.main
const resetPassRoute = mainRoute + clientRoutes.auth.local.resetPass

const userName = ref<string>( '' )
const password = ref<string>( '' )
const saveMe = ref<boolean>( false )

provide( 'username', userName )
provide( 'password', password )

watch(
  () => userName.value,
  (newValue) => {
    props.setUserNameErr( newValue.length < MIN_USER_NAME_LEN || newValue.length > MAX_USER_NAME_LEN )

    authStore.userName = props.userNameErr ? '' : newValue
  }
)
watch(
  () => password.value,
  (newValue) => {
    console.log( newValue )
    props.setPassErr( newValue.length < MIN_PASS_INP_LEN || newValue.length > MAX_PASS_INP_LEN )

    authStore.password = props.passErr ? '' : newValue
  }
)
watch(
  () => saveMe.value,
  (newValue) => {
    authStore.saveMe = newValue
  }
)
</script>
