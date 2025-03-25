<template>
  <div class="sing-in__body flex flex-col gap-[20px]">
    <UIAuthInput
      provider="email"
      :type="AUTH_INP_TYPE.text"
      :showPassword="false"
      :error="authStore.fInpErr.value"
      :title="$t(`${props.basePath}.body.email.title`)"
      :postTitle="undefined"
      :placeHolder="$t(`${props.basePath}.body.email.placeholder`)"
      :svgType="'svgo-dog'"
    />

    <UIAuthInput
      provider="password"
      :type="AUTH_INP_TYPE.password"
      :showPassword="true"
      :error="authStore.sInpErr.value"
      :title="$t(`${props.basePath}.body.password.title`)"
      :postTitle="undefined"
      :placeHolder="$t(`${props.basePath}.body.password.placeholder`)"
      :svgType="'svgo-lock'"
    />

    <div class="body-search flex flex-row justify-between">
      <el-checkbox class="ml-1" v-model="saveMe">{{
        $t(`${props.basePath}.body.checkbox.label`)
      }}</el-checkbox>
      <a class="mt-1" :href="`${resetPassRoute}`">{{
        $t(`${props.basePath}.body.checkbox.link`)
      }}</a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, provide } from 'vue'
import { AUTH_INP_TYPE } from '~/constants/auth'
import { useAuthStore, isValidEmail } from '~/stores/auth'
import { lenPassword } from '~/env/auth.env'
import { clientRoutes } from '~/env/routes.env'


const props = defineProps<{
  basePath: string
}>()

const authStore = useAuthStore()

const mainRoute = clientRoutes.auth.main
const resetPassRoute = mainRoute + clientRoutes.auth.local.resetPass

const email = ref('')
const password = ref('')
const saveMe = ref(false)

provide('email', email)
provide('password', password)

watch(
  () => email.value,
  (newValue) => {
    authStore.fInpErr.value = !isValidEmail(newValue)

    authStore.email = newValue
  }
)
watch(
  () => password.value,
  (newValue) => {
    authStore.sInpErr.value = password.value.length < lenPassword.min

    authStore.password = newValue
  }
)
watch(
  () => saveMe.value,
  (newValue) => {
    authStore.saveMe = newValue
  }
)
</script>
