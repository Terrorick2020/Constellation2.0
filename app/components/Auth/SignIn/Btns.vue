<template>
  <div class="btn-content flex flex-col gap-[5px]">
    <el-button round type="danger" class="bordered" @click="toProfile">
      <span class="align-center mr-[10px] flex flex-row">
        <el-icon>
          <Right />
        </el-icon>
        ]
      </span>
      {{ $t(`${props.basePath}.btns.first`) }}
    </el-button>
    <hr class="mb-[10px] mt-[10px]" />
    <el-button round @click="toSingUp">
      <p class="text-base font-[900] text-black">
        {{ $t(`${props.basePath}.btns.secondary`) }}
      </p>
    </el-button>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore, isValidEmail } from '~/stores/auth'
import { lenPassword } from '~/env/auth.env'
import { clientRoutes } from '~/env/routes.env'

import { Right } from '@element-plus/icons-vue'

const props = defineProps<{
  basePath: string
}>()

const router = useRouter()
const authStore = useAuthStore()

const setRoute = clientRoutes.settings.main
const mainAuthRoute = clientRoutes.auth.main
const regRoute = mainAuthRoute + clientRoutes.auth.local.signUp

const toProfile = async () => {
  authStore.fInpErr.value = !isValidEmail(authStore.email)
  authStore.sInpErr.value = authStore.password.length < lenPassword.min

  if (!authStore.fInpErr.value && !authStore.sInpErr.value) {
    const response = await authStore.login()

    if (response) {
      router.push(setRoute)
    }
  }
}

const toSingUp = () => {
  router.push(regRoute)
}
</script>
