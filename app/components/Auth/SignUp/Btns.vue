<template>
    <div class="btn-content  flex flex-col gap-[5px] mt-[30px]">
        <el-button round @click="nextStep">
            {{ $t( `${ props.basePath }.btns.${ props.step }.main` ) }}
        </el-button>
        <p></p>
        <el-button class="btn-sign-up-down" round @click="prevStep" v-if="$t( `${ props.basePath }.btns.${ props.step }.secondary` )">
            {{ $t( `${ props.basePath }.btns.${ props.step }.secondary` ) }}
        </el-button>
    </div>
</template>

<script setup lang="ts">
import { useAuthStore, isValidEmail, isValidPassword } from '~/stores/auth'
import { useProfileStore } from '~/stores/profile'
import { SUContentStep } from '~/types/auth/sign-up'
import { clientRoutes } from '~/env/routes.env'


const props = defineProps<{
    step: number,
    maxStep: number,
    basePath: string
}>()

const router = useRouter()
const authStore = useAuthStore()
const profileStore = useProfileStore()

const mainRoute = clientRoutes.auth.main
const logRoute = mainRoute + clientRoutes.auth.local.signIn

const nextStep = async () => {
    switch ( props.step ) {
        case SUContentStep.ProfTypeStep:
            if ( profileStore.profileType ) {
                authStore.signUp.contentStep = SUContentStep.LegFormStep
            }
            break
        case SUContentStep.LegFormStep:
            if ( profileStore.legalForm ) {
                authStore.signUp.contentStep = SUContentStep.CompanyTypeStep
            }
            break
        case SUContentStep.CompanyTypeStep:
            if ( profileStore.companyType ) {
                authStore.signUp.contentStep = SUContentStep.WorkFieldsStep
            }
            break
        case SUContentStep.WorkFieldsStep:
            authStore.fInpErr.value = !profileStore.workFields.length
            authStore.fInpErr.index = authStore.fInpErr.value ? 1 : null

            if ( !authStore.fInpErr.value  ) {
                authStore.signUp.contentStep = SUContentStep.ProfInpStep
            }
            break
        case SUContentStep.ProfInpStep:
            authStore.fInpErr.value = !profileStore.companyName.length
            authStore.fInpErr.index = authStore.fInpErr.value ? 2 : null

            authStore.sInpErr.value = !profileStore.companyUrl.length
            authStore.sInpErr.index = authStore.sInpErr.value ? 2 : null

            if( !authStore.fInpErr.value && !authStore.sInpErr.value ) {
                const predict = await authStore.predictValid()

                if ( predict ) {
                    authStore.signUp.contentStep = SUContentStep.RegStep
                }
            }
            break
        case SUContentStep.RegStep:
            authStore.fInpErr.value = !isValidEmail( authStore.email )
            authStore.fInpErr.index = authStore.fInpErr.value ? 1 : null

            const [ res, ind ] = isValidPassword( authStore.password )

            authStore.sInpErr.value = !res
            authStore.sInpErr.index = ind

            authStore.tInpErr.value = authStore.password !== authStore.repass
            authStore.tInpErr.index = authStore.tInpErr.value ? 1 : null

            const predict = !authStore.fInpErr.value && !authStore.sInpErr.value && !authStore.tInpErr.value

            if ( predict ) {
                const response = await authStore.register()
                
                if ( response ) {
                    authStore.signUp.contentStep = SUContentStep.FinalStep
                }
            }
            break
        case SUContentStep.FinalStep:
            router.push( logRoute )
            authStore.restartSignUp()
            break
    }
}
const prevStep = () => {
    switch ( authStore.signUp.contentStep ) {
        case SUContentStep.ProfTypeStep:
            router.push( logRoute )
            break
        case SUContentStep.LegFormStep:
            authStore.signUp.contentStep = SUContentStep.ProfTypeStep
            break
        case SUContentStep.CompanyTypeStep:
            authStore.signUp.contentStep = SUContentStep.ProfTypeStep
            break
        case SUContentStep.WorkFieldsStep:
            authStore.signUp.contentStep = SUContentStep.CompanyTypeStep
            break
        case SUContentStep.ProfInpStep:
            authStore.signUp.contentStep = SUContentStep.WorkFieldsStep
            break
        case SUContentStep.RegStep:
            authStore.signUp.contentStep = SUContentStep.ProfInpStep
            break
    }
}
</script>