<template>
    <div class="sing-in__conteiner w-full">
        <el-container v-loading="authStore.isLoad">
            <el-header style="padding: 0; margin: 0;">
                <ResetPassHeader :step="step" />
            </el-header>
            <el-main style="padding: 0; margin: 0;">
                <ResetPassBody :step="step" class="mt-5" />
            </el-main>
            <el-footer style="padding: 0; margin: 0;">
                <ResetPassBtns :step="step" class="mt-7" />
            </el-footer>
        </el-container>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { useAuthStore } from '~/stores/auth'

import ResetPassHeader from './Header.vue'
import ResetPassBody from './Body/index.vue'
import ResetPassBtns from './Btns.vue'


const authStore = useAuthStore()

const step = computed( () => authStore.resetPass.contentStep )
</script>