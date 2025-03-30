<template>
    <div class="flex flex-col gap-[15px]">
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

        <UIAuthInput provider="pass"
                    :type="AUTH_INP_TYPE.password"
                    :showPassword="true"
                    :error="isSInpErr"
                    :title="'Придумайте пароль'"
                    :postTitle="undefined"
                    :placeHolder="'Введите пароль...'" 
                    :svgType="'svgo-lock'"
        />
        <AuthInfo v-if="isSInpErr" :text="sInpErrMsg" />

        <UIAuthInput provider="repass"
                    :type="AUTH_INP_TYPE.password"
                    :showPassword="true"
                    :error="isTInpErr"
                    :title="'Повторите пароль'"
                    :postTitle="undefined"
                    :placeHolder="'Введите пароль...'"
                    :svgType="'svgo-lock'"
        />
        <AuthInfo v-if="isTInpErr" :text="tInpErrMsg" />

        <div class="info-block w-full">
            <p class="info-block__text description w-full">
            Нажимая далее, вы соглашаетесь с
            <nuxtLink class="link" to="/preview/privacy">Политикой конфиденциальности</nuxtLink>
            и
            <nuxtLink class="link" to="/preview/rules">Публичной офертой</nuxtLink>
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { AUTH_INP_TYPE } from '~/constants/auth'
import { clientRoutes } from '~/env/routes.env'
import {
    useAuthStore,
    isValidUsername,
    isValidPassword
} from '~/stores/auth'


const appErr = {
    first: [
        'Имя пользователя может содержать только латинские буквы, цифры, символы дефиса и нижнего подчёркивания!',
        'Имя пользователя должно быть длиной от 4х до 50ти символов!',
        'Такое имя уже занято!',
    ],
    second: [
        'Пароль должен состоять только из латинских букв, цифр и специальных символов!',
        'Требования: 1 цифра, 1 заглавная буква, 1 специальный символ!',
        'Пароль должен быть длиной от 8 до 50 символов!',
    ],
    third: [
        'Пароли не совпадают!',
    ]
}

const authStore = useAuthStore()

const privacyRoute = clientRoutes.privacy
const rulesRoute = clientRoutes.rules

const username = ref<string>( '' )
const pass = ref<string>( '' )
const repass = ref<string>( '' )

provide( 'username', username )
provide( 'pass', pass )
provide( 'repass', repass )

watch(() => username.value, (newValue) => {
    const [ res, ind ] = isValidUsername( newValue )

    authStore.fInpErr.value = !res
    authStore.fInpErr.index = ind

    authStore.username = res ? newValue : ''
})
watch(() => pass.value, (newValue) => {
    const [ res, ind ] = isValidPassword( newValue )

    authStore.sInpErr.value = !res
    authStore.sInpErr.index = ind

    if ( repass.value ) {
        authStore.tInpErr.value = repass.value !== newValue
        authStore.tInpErr.index = authStore.tInpErr.value ? 0 : null

        authStore.password = !res && !authStore.tInpErr.value ? newValue : ''
    }
})
watch(() => repass.value, (newValue) => {
    authStore.tInpErr.value = newValue !== pass.value
    authStore.tInpErr.index = authStore.tInpErr.value ? 0 : null

    authStore.password = !authStore.tInpErr.value ? newValue : ''
})

const isFInpErr = computed( () => authStore.fInpErr.value )
const fInpErrMsg = computed( () => appErr.first[ authStore.fInpErr.index ] )

const isSInpErr = computed( () => authStore.sInpErr.value )
const sInpErrMsg = computed( () => appErr.second[ authStore.sInpErr.index ] )

const isTInpErr = computed( () => authStore.tInpErr.value )
const tInpErrMsg = computed( () => appErr.third[ authStore.tInpErr.index ] )

const mountedWriteInputs = async () => {
    username.value = authStore.username
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
