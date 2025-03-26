<template>
	<div class="sign-up__conteiner w-full">
		<el-container v-loading="authStore.isLoad">
			<el-header style="padding: 0; margin: 0;">
				<div class="text-content mb-5">
					<p class="description">Регистрация пользователя</p>
					<h2 class="title mt-1">Настройки профиля системы</h2>
				</div>
			</el-header>
			<el-main style="padding: 0; margin: 0;">
				<AuthSignUpBody />
			</el-main>
			<el-footer style="padding: 0; margin: 0;">
				<AuthSignUpBtns class="mt-7" />
			</el-footer>
		</el-container>
	</div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'
const authStore = useAuthStore()
</script>
