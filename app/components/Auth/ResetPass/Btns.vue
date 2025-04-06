<template>
  <div class="btn-content flex flex-col gap-[5px]">
    <el-button type="danger" class="first" round @click="nextStep">
      {{ 
        props.step !== RPContentStep.FinalStep
          ?
          'Далее'
          :
          'Вернуться ко входу'
      }}
    </el-button>
    <p></p>
    <el-button class="second" round v-if="props.step !== RPContentStep.FinalStep" @click="prevStep">Назад</el-button>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore, isValidUsername, isValidPassword } from '~/stores/auth'
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
      const [ resUN, indUN ] = isValidUsername( authStore.username )

      authStore.fInpErr.value = !resUN
      authStore.fInpErr.index = indUN

      if ( resUN ) {
        authStore.resetPass.contentStep = RPContentStep.CodeStep
      }
      break
    case RPContentStep.CodeStep:
      authStore.fInpErr.value = !authStore.key
      authStore.fInpErr.index = authStore.fInpErr.value ? 0 : null

      if (!authStore.fInpErr.value) {
        authStore.resetPass.contentStep = RPContentStep.RewritePassStep
      }
      break
    case RPContentStep.RewritePassStep:
      const [ resP, indP ] = isValidPassword( authStore.password )

      authStore.fInpErr.value = !resP
      authStore.fInpErr.index = indP

      authStore.sInpErr.value = !resP
      authStore.sInpErr.index = 0

      if (resP) {
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
