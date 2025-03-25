<template>
	<div class="sign-up__conteiner w-full">
		<el-container v-loading="authStore.isLoad">
			<el-header style="padding: 0; margin: 0;">
				<AuthSignUpHeader :step="step" :basePath="basePath" />
			</el-header>
			<el-main style="padding: 0; margin: 0;">
				<AuthSignUpBody :step="step" :basePath="basePath" />
			</el-main>
			<el-footer style="padding: 0; margin: 0;">
				<AuthSignUpBtns :step="step" :basePath="basePath" :maxStep="maxStep" class="mt-7" />
			</el-footer>
		</el-container>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAuthStore } from '~/stores/auth'


const authStore = useAuthStore()
const basePath = 'authPage.signUp'

const step = computed( () => authStore.signUp.contentStep )
const maxStep = computed( () => authStore.signUp.lastContentStep )
</script>
