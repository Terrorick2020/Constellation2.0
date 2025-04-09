<template>
  <main class="custom-container flex gap-[30px] pb-[60px] lg:pt-[30px]">
    <NavBar :badges="badges" :setBadges="setBadges" />
    <slot />
  </main>
  <LazyNavBarMobile />
  <Footer />
</template>

<script setup lang="ts">
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
</script>
