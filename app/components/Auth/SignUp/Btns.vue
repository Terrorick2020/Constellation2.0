<template>
  <div class="btn-content flex flex-col gap-[5px]">
    <el-button round type="danger" class="color" @click="toProfile">
      Зарегистрироваться
    </el-button>
    <hr class="horizontal"/>
    <el-button round class="font" @click="toSingUp">
      К странице информации
    </el-button>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/store/auth'
import { clientRoutes } from '~/env/routes.env'

const props = defineProps<{
  setUserNameErr: ( value: boolean ) => void
  setPassErr: ( value: boolean ) => void
}>()

const router = useRouter()
const authStore = useAuthStore()

const setRoute = clientRoutes.account.main
const mainAuthRoute = clientRoutes.auth.main
const regRoute = mainAuthRoute + clientRoutes.auth.local.signUp

const toProfile = async () => {
  props.setUserNameErr( !authStore.userName )
  props.setPassErr( !authStore.password )
  
}

const toSingUp = () => {
  router.push(regRoute)
}
</script>
