<template>
  <button class="flex w-full items-center gap-x-[10px]">
    <SVGArrowLeft class="h-6 w-6" :font-controlled="false" />
    <span class="text-xl font-extrabold">Архивированные чаты</span>
  </button>
</template>

<script setup lang="ts">
import SVGArrowLeft from '@/assets/icons/arrow-left.svg'
</script>
