<template>

  <UIAuthInput provider="pass"
              :type="AUTH_INP_TYPE.password"
              :showPassword="true"
              :error="isFInpErr"
              :title="'Придумайте пароль'"
              :postTitle="undefined"
              :placeHolder="'Введите пароль...'" 
              :svgType="'svgo-lock'"
  />
  <AuthInfo v-if="isFInpErr" :text="fInpErrMsg" />

  <UIAuthInput provider="repass"
              :type="AUTH_INP_TYPE.password"
              :showPassword="true"
              :error="isSInpErr"
              :title="'Повторите пароль'"
              :postTitle="undefined"
              :placeHolder="'Введите пароль...'"
              :svgType="'svgo-lock'"
  />
  <AuthInfo v-if="isSInpErr" :text="sInpErrMsg" />

</template>

<script setup lang="ts">
import { ref, provide } from 'vue'
import { AUTH_INP_TYPE } from '~/constants/auth';
import { useAuthStore, isValidPassword } from '~/stores/auth'


const appErr = {
    first: [
        'Пароль должен состоять только из латинских букв, цифр и специальных символов!',
        'Требования: 1 цифра, 1 заглавная буква, 1 специальный символ!',
        'Пароль должен быть длиной от 8 до 50 символов!',
    ],
    second: [
        'Пароли не совпадают!',
    ]
}

const authStore = useAuthStore()

const pass = ref('')
const repass = ref('')

provide( 'pass', pass )
provide( 'repass', repass )

watch(() => pass.value, (newValue) => {
    const [ res, ind ] = isValidPassword( newValue )

    authStore.fInpErr.value = !res
    authStore.fInpErr.index = ind

    if ( repass.value ) {
        authStore.sInpErr.value = repass.value !== newValue
        authStore.sInpErr.index = authStore.sInpErr.value ? 0 : null

        authStore.password = !res && !authStore.sInpErr.value ? newValue : ''
    }
})
watch(() => repass.value, (newValue) => {
    authStore.sInpErr.value = newValue !== pass.value
    authStore.sInpErr.index = authStore.sInpErr.value ? 0 : null

    const [ res, ind ] = isValidPassword( pass.value )

    authStore.fInpErr.value = !res
    authStore.fInpErr.index = ind

    authStore.password = !authStore.sInpErr.value ? newValue : ''
})

const isFInpErr = computed( () => authStore.fInpErr.value )
const fInpErrMsg = computed( () => appErr.first[ authStore.fInpErr.index ] )

const isSInpErr = computed( () => authStore.sInpErr.value )
const sInpErrMsg = computed( () => appErr.second[ authStore.sInpErr.index ] )
</script>