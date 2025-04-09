<template>
  <main class="custom-container flex gap-[30px] lg:pb-[60px] lg:pt-[30px]">
    <NavBar :badges="badges" :setBadges="setBadges" />
    <div class="lg:border-wrapper w-full">
      <slot />
    </div>
  </main>
  <LazyNavBarMobile />
  <Footer class="hidden lg:flex" />
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
  })
})
</script>
