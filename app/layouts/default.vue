<template>
  <main class="custom-container flex gap-[30px] pb-[60px] lg:pt-[30px]">
    <NavBar />
    <slot />
  </main>
  <LazyNavBarMobile />
  <Footer />
</template>

<script setup lang="ts">
const { $socket } = useNuxtApp()

if (process.client) {
  onMounted(() => {
    $socket.on('new_notification', (data) => {
      console.log('Message from server:', data)
    })
  })
}
</script>
