<template>
    <div class="sing-in__conteiner w-full">
        <el-container v-loading="authStore.isLoad">
            <el-header style="padding: 0; margin: 0;">
                <AuthSignInHeader :basePath="basePath" />
            </el-header>
            <el-main style="padding: 0; margin: 0;">
                <AuthSignInBody :basePath="basePath" class="mt-5" />
            </el-main>
            <el-footer style="padding: 0; margin: 0;">
                <AuthSignInBtns :basePath="basePath" class="mt-5" />
            </el-footer>
        </el-container>
    </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'

const basePath = 'authPage.signIn'
const authStore = useAuthStore()
</script>