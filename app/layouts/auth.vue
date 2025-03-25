<template>
  <div class="common-layout auth-layout w-full">
    <div class="flex flex-col items-center justify-center w-full min-h-screen p-5">
      <section class="sm:w-[540px] w-[95vw]">
          <AuthMotivation class="color-block fadeDown" />
          <div class="color-block mt-2 fadeUp">
            <ElMain>
              <slot />
            </ElMain>
          </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'
import { ElNotification } from 'element-plus'
import { ElMessage } from 'element-plus'

const authStore = useAuthStore()
const i18n: any = useI18n()

const lang = i18n.locale.value
const appWarn = i18n.messages.value[ lang ].authPage.other.appWarn
const apiSuccess = i18n.messages.value[ lang ].authPage.other.apiSuccess
const apiErr = i18n.messages.value[ lang ].authPage.other.apiErr


const SuccessNotification = ( title: string, message: string ) => {
  ElNotification({
    title,
    message,
    type: 'success',
    position: 'bottom-right'
  })
}
const SuccessMessage = ( message: string ) => {
  ElMessage.success( message )
}

const ErrNotification = ( title: string, message: string ) => {
  ElNotification({
    title,
    message,
    type: 'error',
    position: 'bottom-right'
  })
}
const ErrMessage = ( message: string ) => {
  ElMessage.error( message )
}

const WarnNotification = (title: string, message: string) => {
  ElNotification({
    title,
    message,
    type: 'warning',
    position: 'bottom-right'
  })
}
const WarnMessage = ( message: string ) => {
  ElMessage.warning( message )
}


watch(
  () => authStore.apiSuccess.value,
  ( newVal ) => {
    if ( newVal ) {
      const successMsg = apiSuccess[ authStore.apiSuccess.block ]

      if ( window.innerWidth >= 700 ) {
        SuccessNotification( successMsg.title, successMsg.message )
      } else {
        SuccessMessage( successMsg.message )
      }
    }

    authStore.apiSuccess.value = false
    authStore.apiSuccess.block = ''
  }
)
watch(
  () => authStore.apiErr.value,
  ( newVal ) => {
    if ( newVal ) {
      const errorMsg = apiErr[ authStore.apiErr.block ][ String( authStore.apiErr.statusCode ) ]

      if ( window.innerWidth >= 700 ) {
        ErrNotification( errorMsg.title, errorMsg.message )
      } else {
        ErrMessage( errorMsg.message )
      }
    }
    
    authStore.apiErr.value = false
    authStore.apiErr.block = ''
    authStore.apiErr.statusCode = null
  }
)
watch(
  () => authStore.appWarn.value,
  ( newVal ) => {
    if ( newVal) {
      const warnMsg = appWarn[ authStore.appWarn.block ]

      if ( window.innerWidth >= 700 ) {
        WarnNotification( warnMsg.title, warnMsg.message )
      } else {
        WarnMessage( warnMsg.message )
      }
    }

    authStore.appWarn.value = false
    authStore.appWarn.block = ''
  }
)
</script>
