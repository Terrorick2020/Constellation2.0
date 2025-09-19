<template>
  <div class="flex h-full flex-col items-center justify-center text-center">
    <SVGMessageCircle class="size-6 text-orange-woman" :font-controlled="false" />
    <span class="text-sm font-bold text-black">
      Выберите чат, <br />
      чтобы начать переписку
    </span>
  </div>
</template>

<script setup lang="ts">
  import SVGMessageCircle from '@/assets/icons/message-circle.svg'

</script>
