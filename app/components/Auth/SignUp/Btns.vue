<template>
    <div class="btn-content  flex flex-col gap-[5px] mt-[30px]">
        <el-button class="first" round @click="nextStep">Зарегистрироваться</el-button>
        <p></p>
        <el-button class="btn-sign-up-down second" round @click="prevStep">Назад</el-button>
    </div>
</template>

<script setup lang="ts">
import { useAuthStore, isValidUsername, isValidPassword } from '~/stores/auth'
import { useProfileStore } from '~/stores/profile'
import { SUContentStep } from '~/types/auth/sign-up'
import { clientRoutes } from '~/env/routes.env'


const router = useRouter()
const authStore = useAuthStore()
const profileStore = useProfileStore()

const mainRoute = clientRoutes.auth.main
const setRoute = clientRoutes.settings.main
const logRoute = mainRoute + clientRoutes.auth.local.signIn

const nextStep = async () => {
    const [ resUN, indUN ] = isValidUsername( authStore.username )
    const [ resP, indP ] = isValidPassword( authStore.password )

    authStore.fInpErr.value = !resUN
    authStore.fInpErr.index = indUN

    authStore.sInpErr.value = !resP
    authStore.sInpErr.index = indP

    if ( resUN && resP ) {
        const response = await authStore.register()

        console.log( response )
        if(response ) router.push( setRoute );
    }
}
const prevStep = () => {
    router.push( logRoute )
}
</script>