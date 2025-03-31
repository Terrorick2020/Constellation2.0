<template>
  <footer class="bg-white w-full flex justify-center text-sm main-block-wrapper">
    <div
      class="custom-container py-16 flex lg:flex-row flex-col items-center lg:justify-center justify-between lg:gap-20 gap-10"
    >
      <div class="flex flex-col justify-between h-full lg:w-1/3">
        <div class="flex flex-col gap-2">
          <UILogo  />
          <div class="opacity-40">Созвездие - платформа безопасного доведения приказов и распоряжений до личного состава</div>
        </div>
        <div class="mt-2">61каф. "Созвездие" 2025</div>
      </div>
      <div class="flex flex-col gap-[10px] w-full lg:w-1/3">
        <div class="flex gap-2 items-center justify-center lg:justify-start text-[#3D5AD2]">
          <nuxt-link to="/preview">О нас</nuxt-link>
          <SvgoLink />
        </div>
        <div class="flex gap-2 items-center justify-center lg:justify-start text-[#3D5AD2]">
          <nuxt-link to="/preview/privacy">Политика конфиденциальности</nuxt-link>
          <SvgoLink />
        </div>
        <div class="flex gap-2 items-center justify-center lg:justify-start text-[#3D5AD2]">
          <nuxt-link href="/preview/rules">Публичная оферта</nuxt-link>
          <SvgoLink />
        </div>
      </div>
      <div class="lg:w-1/3 flex flex-col lg:justify-end justify-center items-center lg:items-end h-full w-full gap-2">
        <div class="w-full">
          <nuxt-link v-if="isAuth" href="/docs"><el-button round class="btn-main w-full">На главную</el-button></nuxt-link>
          <nuxt-link v-else href="/auth/sign-in"><el-button round class="btn-main w-full">Вход/Регистрация</el-button></nuxt-link>
        </div>
        <div class="w-full">
          <el-button round class="btn-empty w-full" icon="svgo-bomb" @click="handleErr">Сообщить о проблеме</el-button>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const isAuth = ref<boolean>( true )

const handleErr = () => {
  console.log( 'сообщиь о проблеме' )
}
</script>

<style scoped lang="scss">
.btn-empty {
  --el-button-hover-bg-color: #f765412d;
  --el-button-hover-border-color: #ff6b464d;

  color: #000000;;
}
</style>



<!-- color: var(--primary-main-font-color); -->