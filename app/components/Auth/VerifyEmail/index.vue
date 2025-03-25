<template>
    <el-container v-loading="authStore.isLoad">
        <el-main style="padding: 0; margin: 0;" >
            <div v-if="isChecked">
                <el-result
                    :icon="`${ iconType }`"
                    :title="$t( `${ basePath }.${ iconType }.title` )"
                    :sub-title="$t( `${ basePath }.${ iconType }.subTitle` )"
                >
                </el-result>
            </div>
            <div v-else class="h-[250px]" />
            <p class="w-full text-center" id="animated-id"></p>
        </el-main>
    </el-container>
</template>

<script setup lang="ts">
// @ts-ignore
import { useReward } from 'vue-rewards'
import { useAuthStore } from '~/stores/auth'
import { EIconType } from '~/types/auth/verify-email'
import { clientRoutes } from '~/env/routes.env'


const authStore = useAuthStore()
const router = useRouter()

const basePath = 'authPage.verifyEmail'
const isChecked = ref( false )
const iconType = ref<EIconType>( EIconType.Info )

const setRoute = clientRoutes.settings.main

const mountedGetRes = async () => {
    const query = router.currentRoute.value.query

    const response = await authStore.verifyEmail( query )

    iconType.value = Boolean( response ) ? EIconType.Success : EIconType.Error
    isChecked.value = true

    if ( response ) {
        const { reward, _ } = useReward('animated-id', 'confetti')
        reward()

        setTimeout(
            () => {
                router.push( setRoute )
            },
            300
        )
    }
}

onMounted( () => {
    mountedGetRes()
})
</script>
