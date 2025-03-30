<template>
  <div class="flex flex-col gap-[10px] text-sm">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-x-[10px]">
        <el-avatar :size="48" :src="Avatar" class="border border-black/15" />
        <div class="flex flex-col">
          <!-- TODO: Username -->
          <span class="font-extrabold text-base">Название профиля </span>
          <span class="text-sm opacity-80 leading-[140%]">Название документа2222 </span>
          <!-- TODO: Подразделение -->
          <span class="text-sm opacity-40 leading-[140%]">Подразделение</span>
        </div>
      </div>
      <div v-if="indexPage" class="flex items-center transition-all group-hover:translate-x-[2px] gap-x-[10px]">
        <UIPopoverMenu :list="LIST_OPTIONS" @select="onSelect">
          <template #reference>
            <button>
              <SvgoMoreVertical class="w-6 h-6" filled :font-controlled="false" />
            </button>
          </template>
        </UIPopoverMenu>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useDocumentStore } from '~/stores/documentStore'
import Avatar from '~/assets/image/avatar.png'
import type { TPopoverItemProps } from '~/types/UI/popover'

const router = useRouter()
const documentStore = useDocumentStore()

const props = withDefaults(
  defineProps<{
    indexPage?: boolean
  }>(),
  {
    indexPage: false
  }
)

const LIST_OPTIONS: TPopoverItemProps[] = [
  { key: 'subscribe', label: 'Подписать документ', route: '/subscribe' },
  { key: 'message', label: 'Посмотреть документ', route: '/message' },
  { key: 'block', label: 'Скачать документ', route: '/block' },
  { key: 'copy', label: 'Скопировать ссылку', route: '/copy' },
]

const onSelect = (option: (typeof LIST_OPTIONS)[0]) => {
  console.log('option', option)
  if (option.route) {
    documentStore.setDocumentName('Название документа2222')

    router.push(option.route)
  }
}
</script>

