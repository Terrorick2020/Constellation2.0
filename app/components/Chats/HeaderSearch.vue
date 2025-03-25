<template>
  <form class="relative h-6">
    <SVGSearch class="absolute size-6 translate-y-0" :font-controlled="false" />
    <input
      type="text"
      placeholder="Поиск по названию и др..."
      class="relative w-full border-b border-b-transparent bg-transparent pl-8 pr-4 text-sm placeholder:text-gray-500 focus:outline-none"
    />
  </form>
</template>

<script setup lang="ts">
import SVGSearch from '@/assets/icons/search.svg'
</script>
