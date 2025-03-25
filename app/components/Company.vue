<template>
  <div class="flex flex-col gap-[10px] text-sm">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-x-[10px]">
        <el-avatar :size="48" :src="Avatar" class="border border-black/15" />
        <div class="flex flex-col">
          <span class="font-extrabold text-base">Название профиля </span>
          <span class="text-sm opacity-40 leading-[140%]">Дескриптор · Подразделение</span>
        </div>
      </div>
      <div v-if="indexPage" class="flex items-center transition-all group-hover:translate-x-[2px] gap-x-[10px]">
        <button @click="isFavorite = !isFavorite">
          <component 
            :is="`svgo-${isFavorite ? 'StarFill' : 'StarOutline'}`"
            :font-controlled="false" 
            class="w-6 h-6" 
            filled
          />
        </button>
        <UIPopoverMenu :list="LIST_OPTIONS" @select="onSelect">
          <template #reference>
            <button>
              <SvgoMoreVertical class="w-6 h-6" filled :font-controlled="false" />
            </button>
          </template>
        </UIPopoverMenu>
      </div>
    </div>
    <div
      class="group flex cursor-pointer items-center justify-between rounded-2xl border border-black/15 px-5 py-[18px]"
      :class="{
        'bg-white': indexPage
      }"
    >
      <div class="flex items-center gap-x-[5px] font-semibold text-sm">
        <SvgoPinLocationOutline class="w-6 h-6" :font-controlled="false" />
        <span class="leading-none">Россия; Москва; Ул. Снежная 16</span>
      </div>
      <div v-if="indexPage" class="transition-all group-hover:translate-x-[2px]">
        <SvgoArrow filled class="rotate-90 transform text-xl" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import Avatar from '@/assets/image/avatar.png'
import type { TPopoverItemProps } from '~/types/UI/popover';

const props = withDefaults(
  defineProps<{
    indexPage?: boolean
  }>(),
  {
    indexPage: false
  }
)

const LIST_OPTIONS: TPopoverItemProps[] = [
  { key: 'message', label: 'Написать сообщение' },
  { key: 'block', label: 'Заблокировать' },
  { key: 'report', label: 'Пожаловаться' },
  { key: 'copy', label: 'Скопировать ссылку' },
]

const isFavorite = ref(false)

const onSelect = (option: (typeof LIST_OPTIONS)[0]) => {
  console.log('option', option)
}
</script>
