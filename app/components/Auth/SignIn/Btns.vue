<template>
  <div class="btn-content flex flex-col gap-[5px]">
    <el-button round type="danger" class="color" @click="toProfile">
      <span class="align-center flex flex-row" style="margin-right: 0.5rem;">
        <el-icon>
          <Right />
        </el-icon>
        ]
      </span>
      Войти в аккаунт
    </el-button>
    <hr class="horizontal"/>
    <el-button round class="font" @click="toSingUp">
      Нет аккаунта? Регистрация
    </el-button>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/store/auth'
import { clientRoutes } from '~/env/routes.env'
import { Right } from '@element-plus/icons-vue'

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
  props.setUserNameErr( !!authStore.userName )
  props.setPassErr( !!authStore.password )

  const calculateNext = authStore.userName && authStore.password

  if ( calculateNext ) {
    router.push( setRoute )
  }
}

const toSingUp = () => {
  router.push( regRoute )
}
</script>
