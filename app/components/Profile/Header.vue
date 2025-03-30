<template>
  <section class="relative w-full rounded-3xl border border-transparent font-medium">
    <div class="absolute left-0 right-0 top-0 z-[1] w-full">
      <img
        v-if="profileInfo.previewImage"
        :src="profileInfo.previewImage"
        class="h-[199px] w-full object-cover object-center lg:h-full lg:rounded-xl"
        alt="fon-img"
      />
      <div v-else class="h-[199px] w-full bg-gray-300 flex justify-center items-center rounded-xl">
        <el-icon class="max-lg:mb-[75px]">
          <icon-picture />
          <span class="ml-2">Ваша фоновая картинка</span>
        </el-icon>
      </div>
    </div>

    <div
      class="block-wrapper profile-header-container relative z-[2] mt-[199px] gap-y-5 !rounded-t-none lg:mt-[155px] lg:rounded-[20px]"
    >
      <div class="relative flex flex-col items-center gap-5 lg:flex-row lg:items-stretch">
        <div class="w-[130px] bg-white p-[2px]">
          <el-avatar
            :size="130"
            :src="profileInfo.logo ?? DEFAULT_LOGO"
            class="absolute bottom-14 lg:bottom-0"
          />
        </div>
        <div class="flex flex-col items-center lg:items-stretch">
          <span class="text-2xl font-extrabold">{{ profileInfo.name }}</span>
          <span class="text-sm">{{ profileInfo.organization }}</span>
        </div>
      </div>

      <div class="item2 flex">
        <el-button round size="large" class="btn-main long fill-none !px-[54px] !text-[10xp]">
          <template #icon>
            <SvgoMessage filled />
          </template>
          Сообщение
        </el-button>
        <el-button circle :icon="'svgo-more'" class="btn-empty"></el-button>
      </div>

      <p class="text-center text-sm opacity-40 lg:text-left">
        {{ profileInfo.description }}
      </p>

      <div class="flex flex-wrap gap-2">
        <el-tag v-for="item in profileInfo.tags" :key="item.id" round>
          {{ item.name }}
        </el-tag>
      </div>
      <div class="flex items-center gap-2 text-sm"><SvgoPin /> {{ profileInfo.location }}</div>
      <div v-if="profileInfo.site" class="flex items-center gap-2 text-sm underline">
        <SvgoGlobe /> {{ profileInfo.site }}
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { DEFAULT_LOGO } from '~/constants/profile'
import { Picture as IconPicture } from '@element-plus/icons-vue'
import { useProfileStore } from '~/stores/profile'

const { profileInfo } = useProfileStore()
</script>


<!-- три точки:
     Пожаловаться
     Заблокировать (ТОЛЛЬКО ДЛОЯ АДМИНА)
     Заблокать
      -->