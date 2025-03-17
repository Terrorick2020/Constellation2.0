<template>
    <div class="flex flex-col gap-[1.2rem]">
      <UIInputBlock
        provider="username"
        :type="AUTH_INP_TYPE.text"
        :showPassword="false"
        title="Название аккаунта"
        :error="props.userNameErr"
        :info="userNameInfo"
        :postTitle="undefined"
        placeHolder="Введите username..."
        :svgType="'svgo-dog'"
      />
  
      <UIInputBlock
        provider="password"
        :type="AUTH_INP_TYPE.password"
        :showPassword="true"
        :error="props.passErr"
        title="Придумайте пароль"
        :info="passInfo"
        :postTitle="undefined"
        placeHolder="Введите пароль..."
        :svgType="'svgo-lock'"
      />
  
      <UIInputBlock
        provider="repass"
        :type="AUTH_INP_TYPE.password"
        :showPassword="true"
        :error="props.repassErr"
        title="Повторите пароль"
        :info="repassInfo"
        :postTitle="undefined"
        placeHolder="Введите пароль..."
        :svgType="'svgo-lock'"
      />
  
    </div>
  </template>
  
<script setup lang="ts">
import { ref, provide } from 'vue'
import {
    userNameInfoList,
    passInfoList,
    repassInfoList,
    AUTH_INP_TYPE,
} from '~/constants/auth'
import {
    useAuthStore,
    isValidPassword,
    isValidUsername,
} from '~/store/auth'
import { clientRoutes } from '~/env/routes.env'


const props = defineProps<{
    userNameErr: boolean
    setUserNameErr: ( value: boolean ) => void
    passErr: boolean
    setPassErr: ( value: boolean ) => void
    repassErr: boolean
    setRepassErr: ( value: boolean ) => void
}>()


const authStore = useAuthStore()

const mainRoute = clientRoutes.auth.main
const resetPassRoute = mainRoute + clientRoutes.auth.local.resetPass

const userName = ref<string>( '' )
const password = ref<string>( '' )
const repass = ref<string>( '' )

provide( 'username', userName )
provide( 'password', password )
provide( 'repass', repass )

const userNameInfo = ref<string>( '' )
const passInfo  = ref<string>( '' )
const repassInfo  = ref<string>( '' )

watch(
    () => userName.value,
    (newValue) => {
        const predValidUsername = isValidUsername( newValue )

        props.setUserNameErr( !predValidUsername[0] )

        userNameInfo.value = predValidUsername[1] !== null ? userNameInfoList[ predValidUsername[1] ] : ''
        authStore.userName = props.userNameErr ? '' : newValue
    }
)
watch(
    () => password.value,
    (newValue) => {
        const predValidPass = isValidPassword( newValue )

        props.setPassErr( !predValidPass[0] )

        passInfo.value = predValidPass[1] !== null ? passInfoList[ predValidPass[1] ] : ''
    }
)
watch(
    () => repass.value,
    (newValue) => {
        const predValidRepass = password.value === newValue

        props.setRepassErr( !predValidRepass )

        repassInfo.value = !predValidRepass ? repassInfoList[0] : ''
        authStore.password = predValidRepass ? newValue : ''
    }
)
watch(
  () => props.passErr,
  (newValue) => {
    if( newValue ) {
      const predValidPass = isValidPassword( password.value )

      props.setRepassErr( predValidPass[0] )
      repassInfo.value = predValidPass[0] ? repassInfoList[0] : ''

      props.setPassErr( false )
    }
  }
)
</script>
