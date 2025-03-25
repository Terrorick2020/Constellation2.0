<template>
    <UISelection
        :setLoading="setLoading"
        :warnMoreThen="warnMoreThen"
        :errorZeroLen="errorZeroLen"
    />
    <AuthInfo v-if="isFInpErr" :text="$t(`${ props.basePath }.appErr.first[ ${ fInpErrInd } ]`)" />

    <el-skeleton
        v-if="isLoading"
        :rows="6"
        animated 
    />
</template>

<script setup lang="ts">
import { SignUpRT } from '~/env/requests.env'
import { useAuthStore } from '~/stores/auth'
import { useProfileStore } from '~/stores/profile'

import type {
    SelVariable,
    WorkFieldBlock,
    FieldBlockChilde,
    BlockChildeItem
} from '~/types/auth/sign-up'

const props = defineProps<{
    basePath: string
}>()

const authStore = useAuthStore()
const profileStore = useProfileStore()

const isLoading = ref( true )

const setLoading = (value: boolean): void => {
    isLoading.value = false
}

const warnMoreThen = () => {
    authStore.appWarn.value = true
    authStore.appWarn.block = 'selCountWarn'
}

const errorZeroLen = () => {
    authStore.fInpErr.value = !profileStore.workFields.length
    authStore.fInpErr.index = authStore.fInpErr.value ? 1 : null
}

const isFInpErr = computed( () => authStore.fInpErr.value )
const fInpErrInd = computed( () => authStore.fInpErr.index )
</script>
