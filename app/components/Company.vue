<template>
  <div class="flex flex-col gap-[10px] text-sm">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-x-[10px]">
        <el-avatar :size="48" :src="Avatar" class="border border-black/15" />
        <div class="flex flex-col">
          <!-- TODO: Username -->
          <span class="font-extrabold text-base">{{ props.item.title }} </span>
          <span class="text-sm opacity-80 leading-[140%]">{{ formatDate(props.item.date)}}</span>
          <!-- TODO: Подразделение -->
          <!-- <span class="text-sm opacity-40 leading-[140%]">61 кафедра</span> -->
        </div>
      </div>
      <div v-if="indexPage" class="flex items-center transition-all group-hover:translate-x-[2px] gap-x-[10px]">
        <UIPopoverMenu :list="LIST_OPTIONS" :setTable="setTable" :id="props.item.id" @select="onSelect">
          <template #reference>
            <el-button circle :icon="'svgo-more'" class="btn-empty"></el-button>
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
    item: { name: string; date: string; title: string, slug: string, id: string}
    setTable: (value: boolean) => void
  }>(),
  {
    indexPage: false
  }
)


const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${hours}:${minutes}:${seconds} ${day}-${month}-${year} `;
}

const LIST_OPTIONS: TPopoverItemProps[] = [
  { key: 'viewdoc', label: 'К документу', },
  { key: 'download', label: 'Скачать документ' },
  { key: 'copy', label: 'Скопировать ссылку'},
  { key: 'statistics', label: 'Посмотреть статистику' },
  { key: 'delete', label: 'Удалить документ' }
]

const onSelect = (option: (typeof LIST_OPTIONS)[0]) => {
  console.log('option', option)
}
</script>


<style scoped>
/* Ваши стили */
</style>