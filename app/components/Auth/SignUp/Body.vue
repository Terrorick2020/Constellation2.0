<template>
    <div class="flex flex-col gap-[15px]">
        <UIAuthInput provider="email"
              :type="AUTH_INP_TYPE.text"
              :showPassword="false"
              :error="isFInpErr"
              :title="'Имя пользователя'"
              :postTitle="undefined"
              :placeHolder="'Введите username...'" 
              :svgType="'svgo-user'" 
        />
        <AuthInfo v-if="isFInpErr" :text="`${ appErr.second[ sInpErrInd - 1 ] }`" />

        <UIAuthInput provider="pass"
                    :type="AUTH_INP_TYPE.password"
                    :showPassword="true"
                    :error="isSInpErr"
                    :title="'Придумайте пароль'"
                    :postTitle="undefined"
                    :placeHolder="'Введите пароль...'" 
                    :svgType="'svgo-lock'"
        />
        <AuthInfo v-if="isSInpErr" :text="`${ appErr.second[ fInpErrInd - 1 ] }`" />

        <UIAuthInput provider="repass"
                    :type="AUTH_INP_TYPE.password"
                    :showPassword="true"
                    :error="isTInpErr"
                    :title="'Повторите пароль'"
                    :postTitle="undefined"
                    :placeHolder="'Введите пароль...'"
                    :svgType="'svgo-lock'"
        />
        <AuthInfo v-if="isTInpErr" :text="`${ appErr.third[ tInpErrInd - 1 ] }`" />

        <div class="info-block w-full">
            <p class="info-block__text description w-full">
            Нажимая далее, вы соглашаетесь с
            <nuxtLink class="link" :to="privacyRoute">Политикой конфиденциальности</nuxtLink>
            и
            <nuxtLink class="link" :to="rulesRoute">Публичной офертой</nuxtLink>
            </p>
        </div>
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


const appErr = {
    first: [
        'Некорректный формат почты!',
        'Такая почта занята!',
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
