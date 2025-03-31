<template>
  <div class="btn-content flex flex-col gap-[5px]">
    <el-button type="danger" round @click="nextStep">Далее</el-button>
    <p></p>
    <el-button round v-if="step !== RPContentStep.FinalStep" @click="prevStep">Назад</el-button>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore, isValidUsername } from '~/stores/auth'
import { RPContentStep } from '~/types/auth/reset-pass'
import { clientRoutes } from '~/env/routes.env'
import { lenCode, lenPassword } from '~/env/auth.env'

const props = defineProps<{
  step: number
}>()

const authStore = useAuthStore()
const router = useRouter()

const mainRoute = clientRoutes.auth.main
const logRoute = mainRoute + clientRoutes.auth.local.signIn

const nextStep = async () => {
  switch (props.step) {
    case RPContentStep.EmailStep:
      const [ res, ind ] = isValidUsername( authStore.username )

      authStore.fInpErr.value = !res
      authStore.fInpErr.index = ind

      if ( res ) {
        const response = await authStore.sendUsername()

        if (response) {
          authStore.resetPass.contentStep = RPContentStep.CodeStep
        }
      }
      break
    case RPContentStep.CodeStep:
      authStore.fInpErr.value = !authStore.key
      authStore.fInpErr.index = authStore.fInpErr.value ? 0 : null

      if (!authStore.fInpErr.value) {
        const response = await authStore.checkingCode()

        if (response) {
          authStore.resetPass.contentStep = RPContentStep.RewritePassStep
        }
      }
      break
    case RPContentStep.RewritePassStep:
      if (!authStore.fInpErr.value) {
        authStore.fInpErr.value = authStore.password.length < lenPassword.min
        authStore.fInpErr.index = authStore.fInpErr.value ? 3 : null
      }

      if (authStore.password) {
        const response = await authStore.rewritePass()

        if (response) {
          authStore.resetPass.contentStep = RPContentStep.FinalStep
        }
      }

      break
    case RPContentStep.FinalStep:
      router.push(logRoute)
      break
  }
}
const prevStep = () => {
  switch (props.step) {
    case RPContentStep.CodeStep:
      authStore.resetPass.contentStep = RPContentStep.EmailStep
      break
    default:
      router.push(logRoute)
      break
  }
}
</script>
