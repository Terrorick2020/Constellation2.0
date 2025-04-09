<template>
  <main class="custom-container flex gap-[30px] lg:pb-[60px] lg:pt-[30px]">
    <NavBar />
    <div class="lg:border-wrapper w-full">
      <slot />
    </div>
  </main>
  <LazyNavBarMobile />
  <Footer class="hidden lg:flex" />
</template>

<script scoped lang="ts">
const { $socket } = useNuxtApp()


onMounted(() => {
  $socket.on('new_notification', (data) => {
    console.log('Message from server:', data)
  })
})
</script>