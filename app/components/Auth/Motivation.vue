<template>
    <div class="w-full flex flex-row justify-between items-center h-[150px] gap-2">
        <div class="main-text">
            <img :src="PageLogo" alt="insert-logo" />
            <p class="description mt-2">{{ $t('authPage.motivation.mainText') }}</p>
        </div>
        <div v-if="isRegisterPage">
            <p class="title-min" v-if="computedNeedingToAdditionalText">
                {{ $t('authPage.motivation.additionalText', { stepCount: stepCount }) }}
            </p>
            <p class="title-min" v-if="computedNeedingToLastText">
                {{ $t('authPage.motivation.lastText') }}
            </p>
        </div>
        <div v-if="isVerEmailPage">
            🔥🔥🔥🔥
        </div>
    </div>
</template>


<script setup lang="ts">
import { computed } from 'vue'
import { useAuthStore } from '~/stores/auth'
import { SUContentStep } from '~/types/auth/sign-up'
import { clientRoutes } from '~/env/routes.env'

import PageLogo from '~/assets/image/page-logo.png'


const authStore = useAuthStore()
const router = useRouter()

const mainRoute = clientRoutes.auth.main
const regRoute = mainRoute + clientRoutes.auth.local.signUp
const verEmailRoute = mainRoute + clientRoutes.auth.local.verifyEmail

const isRegisterPage = computed( () => router.currentRoute.value.path === regRoute )
const isVerEmailPage = computed( () => router.currentRoute.value.path === verEmailRoute )
const computedNeedingToAdditionalText = computed( 
    () => authStore.signUp.contentStep >= SUContentStep.WorkFieldsStep && 
          authStore.signUp.contentStep < SUContentStep.FinalStep 
)
const computedNeedingToLastText = computed( () => authStore.signUp.contentStep === SUContentStep.FinalStep )
const stepCount = computed( () => authStore.signUp.contContentStep - authStore.signUp.contentStep )
</script>