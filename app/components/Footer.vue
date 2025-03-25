<template>
  <footer class="bg-white w-full flex justify-center text-sm main-block-wrapper">
    <div
      class="custom-container py-16 flex lg:flex-row flex-col items-center justify-between lg:gap-20 gap-10"
    >
      <div class="flex flex-col justify-between h-full lg:w-1/3">
        <div class="flex flex-col gap-2">
          <UILogo  />
          <div class="opacity-40">Созвездие - платформа безопасного доведения приказов и распоряжений до личного состава</div>
        </div>
        <div class="mt-2">61каф. "Созвездие" 2025</div>
      </div>
      <div class="flex flex-col gap-[10px] w-full lg:w-1/3">
        <div class="flex gap-2 items-center text-[#3D5AD2]">
          <nuxt-link to="/">О нас</nuxt-link>
          <SvgoLink />
        </div>
        <div class="flex gap-2 items-center text-[#3D5AD2]">
          <nuxt-link to="/privacy">Политика конфиденциальности</nuxt-link>
          <SvgoLink />
        </div>
        <div class="flex gap-2 items-center text-[#3D5AD2]">
          <nuxt-link href="/rules">Публичная оферта</nuxt-link>
          <SvgoLink />
        </div>
      </div>
      <div class="lg:w-1/3 flex flex-col justify-end lg:items-end h-full w-full gap-2">
        <div>
          <nuxt-link href="https://dev.collaba.pro/auth/sign-in"><el-button round class="btn-main">Вход/Регистрация</el-button></nuxt-link>
        </div>
        <div>
          <el-button round class="btn-empty" icon="svgo-email">invoice@collaba.pro</el-button>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>

</script>
