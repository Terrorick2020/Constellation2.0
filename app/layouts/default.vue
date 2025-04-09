<template>
  <main class="custom-container flex gap-[30px] pb-[60px] lg:pt-[30px]">
    <NavBar :badges="badges" :setBadges="setBadges" />
    <slot />
  </main>
  <LazyNavBarMobile />
  <Footer />
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'
import { ElNotification } from 'element-plus'
import { ElMessage } from 'element-plus'
import { ApiResType, type ApiRes } from '~/types/auth'
import type { Badges } from '~/types/props'

const { $socket } = useNuxtApp()


const badges: Badges = reactive({
  profIsBadge: false,
  docsIsBadge: false,
  chatsIsBadge: false,
  offersIsBadge: false,
  setIsBadge: false,
})

const setBadges = (newBadges: Badges) => {
  Object.assign(badges, newBadges)
}

onMounted(() => {
  $socket.on('new_notification', (data) => {
    console.log('Message from server:', data)
    badges.offersIsBadge = true
  })
})

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
