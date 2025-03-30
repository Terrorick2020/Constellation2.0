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
import { ApiResType, type ApiRes } from '~/types/auth'

const authStore = useAuthStore()

const sendMsg = ( title: string, message: string, type: ApiResType ) => {
  if ( window.innerWidth >= 700  ) {
    ElNotification({
      title,
      message,
      type,
      position: 'bottom-right'
    })
  } else {
    ElMessage[type]( message )
  }
}

watch(
  () => authStore.apiRes.value,
  ( newVal ) => {
    if ( newVal ) {
      const title = authStore.apiRes.title
      const message = authStore.apiRes.msg
      const type = authStore.apiRes.type

      sendMsg( title, message, type )
    }

    authStore.apiRes.value = false
    authStore.apiRes.title = ''
    authStore.apiRes.msg = ''
  }
)
</script>
