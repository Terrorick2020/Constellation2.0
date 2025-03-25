<template>
  <div class="flex w-full flex-col">
    <div class="mb-5 flex flex-col gap-[10px] lg:flex-row">
      <el-input
        size="large"
        placeholder="Поиск по названию и др...."
        class="h-[60px] max-w-full lg:max-w-[635px]"
      >
        <template #prefix>
          <SvgoSearch filled class="h-6 w-[30px]" :font-controlled="false" />
        </template>
      </el-input>
      <div class="flex items-center gap-x-[10px] grow">
        <Filters />
        <Sort />
      </div>
    </div>

    <div class="space-y-[30px]">
      <div class="flex w-full flex-col gap-[10px]" v-for="companyIndex in 5">
        <Company index-page />
        <div class="border border-black/15 p-4 flex flex-col gap-y-[20px] bg-white rounded-2xl">
          <div class="flex flex-col gap-[10px]">
            <h2 class="text-xs font-extrabold text-black/50 uppercase leading-[110%]">КАТЕГОРИИ</h2>
            <div class="flex w-full flex-wrap gap-[5px]">
              <template v-if="profileInfo.tags.length">
                <el-tag v-for="item in profileInfo.tags" :key="item.name" round>
                  {{ item.name }}
                </el-tag>
              </template>
              <p v-else class="text-sm">Не задано</p>
            </div>
          </div>
          <div class="flex flex-col gap-[10px]">
            <h2 class="text-xs font-extrabold text-black/50 uppercase leading-[110%]">АУДИТОРИЯ</h2>
            <div class="flex w-full flex-wrap gap-[5px]">
              <template v-if="audienceTags.length">
                <el-tag v-for="item in audienceTags" class="dark" :key="item.name" round>
                  {{ item.name }}
                </el-tag>
              </template>
              <p v-else class="text-sm">Не задано</p>
            </div>
          </div>

          <div class="flex flex-col gap-[10px]">
            <h2 class="text-xs font-extrabold text-black/50 uppercase leading-[110%]">УСЛОВИЯ СОТРУДНИЧЕСТВА</h2>
            <div class="flex w-full flex-wrap gap-[5px]">
              <template v-if="terms.tags.length">
                <el-tag v-for="item in terms.tags" class="dark" :key="item.name" round>
                  {{ item.name }}
                </el-tag>
              </template>
              <p v-else class="text-sm">Не задано</p>
            </div>
          </div>
          <div class="flex flex-col gap-[10px]">
            <h2 class="text-xs font-extrabold text-black/50 uppercase leading-[110%]">РЕКЛАМНЫЙ ИНВЕНТАРЬ</h2>
            <div class="flex items-center gap-x-[5px] flex-wrap">
              <button v-for="inventory in INVENTORY_LIST" :key="inventory.key">
                <component 
                  :is="`svgo-${inventory.icon}`" 
                  :font-controlled="false"
                  class="w-9 h-9"
                  filled
                />
              </button>
              <button>
                <el-tag round>Ещё 15</el-tag>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useProfileStore } from '~/stores/profile.js'
import { useFiltersStore } from '~/stores/filters.js'

const i18n: any = useI18n()
const lang = i18n.locale.value

const title = i18n.messages.value[lang].catalogPage?.docTitle
const desc = i18n.messages.value[lang].catalogPage?.docDesc

useSeoMeta({
  title: title,
  ogTitle: title,
  description: desc,
  ogDescription: desc
})

const filtersStore = useFiltersStore()
const { profileInfo, audience, terms } = useProfileStore()

const audienceTags = computed(() => {
  return [
    ...audience.age,
    ...audience.segment_tags,
    ...audience.geo_tags,
    ...audience.interes_tags,
  ]
})

const INVENTORY_LIST = [
  { key: 'telegram', icon: 'telegram', label: '' },
  { key: 'vk', icon: 'vk', label: '' },
  { key: 'youtube', icon: 'youtube', label: '' },
  { key: 'yandex-dzen', icon: 'yandex-dzen', label: '' },
]
</script>