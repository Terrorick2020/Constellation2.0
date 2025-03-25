<template>
    <div class="sing-in__conteiner w-full">
        <el-container v-loading="authStore.isLoad">
            <el-header style="padding: 0; margin: 0;">
                <h2 class="title mt-1">Вход в аккаунт</h2>
            </el-header>
            <el-main style="padding: 0; margin: 0;">
                <AuthSignInBody class="mt-5" />
            </el-main>
            <el-footer style="padding: 0; margin: 0;">
                <AuthSignInBtns class="mt-5" />
            </el-footer>
        </el-container>
    </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'


const authStore = useAuthStore()

</script>