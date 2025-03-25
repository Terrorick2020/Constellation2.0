<template>
  <section class="main-block-wrapper">
    <h2 class="mb-5 text-2xl font-bold">Фото и видео</h2>

    <div
      v-if="profileInfo.profileImages.length"
      class="grid grid-cols-[repeat(3,_minmax(90px,240px))] gap-[10px] md:grid-cols-[repeat(6,_minmax(110px,244px))]"
    >
      <div
        v-for="item in profileInfo.profileImages"
        :key="item.id"
        class="w-full overflow-hidden rounded-xl"
      >
        <img :src="item.url" class="w-full object-cover" alt="" />
      </div>
    </div>
    <div v-else>
      <h4 class="ml-1 text-md opacity-70">Фотографии не загружены</h4>
    </div>
  </section>
</template>
<script setup lang="ts">
import { useProfileStore } from '~/stores/profile'
const { profileInfo } = useProfileStore()
</script>
