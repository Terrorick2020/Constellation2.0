<template>
    <main class="custom-container flex gap-[30px] pb-[60px] lg:pt-[30px]">
      <NavBar />
      <slot />
    </main>
    <LazyNavBarMobile />
    <Footer />
</template>
  