<template>
  <div class="btn-content flex flex-col gap-[5px]">
    <el-button round type="danger" class="bordered" @click="toProfile">
      <span class="align-center mr-[10px] flex flex-row">
        <el-icon>
          <Right />
        </el-icon>
        ]
      </span>
      Войти в аккаунт
    </el-button>
    <hr class="mb-[10px] mt-[10px]" />
    <el-button round @click="toSingUp">
      <p class="text-base font-[900] text-black">Нет аккаунта? Регистрация</p>
    </el-button>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'
import { lenPassword, lenUsername } from '~/env/auth.env'
import { clientRoutes } from '~/env/routes.env'
import { Right } from '@element-plus/icons-vue'


const router = useRouter()
const authStore = useAuthStore(); 

const setRoute = clientRoutes.settings.main
const mainAuthRoute = clientRoutes.auth.main
const regRoute = mainAuthRoute + clientRoutes.auth.local.signUp

const toProfile = async () => {
  const { usernaem, password } = useAuthStore()

  authStore.fInpErr.value = usernaem.length < lenUsername.min || usernaem.length > lenUsername.max
  authStore.sInpErr.value = password.length < lenPassword.min || password.length > lenPassword.max

  if (!authStore.fInpErr.value && !authStore.sInpErr.value) {
    const response = await authStore.login()

    if (response) {
      router.push(setRoute)
    }
  }
}

const toSingUp = () => {
  console.log( 'sdvsdv' )
  router.push(regRoute)
}
</script>
