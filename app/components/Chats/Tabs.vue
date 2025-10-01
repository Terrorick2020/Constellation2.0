<template>
  <div class="py-3">
    <el-scrollbar class="!h-max" wrap-class="!overflow-y-hidden my-2" view-class="flex">
      <div class="flex justify-between gap-x-5">
        <button
          v-for="tab in TABS"
          :key="tab.key"
          :class="[
            'w-max text-sm first:pl-5 last:pr-5',
            props.filterKey === tab.key
              ? 'font-bold text-black'
              : 'text-gray-500 hover:text-gray-600'
          ]"
          @click="emit('select', tab.key)"
        >
          {{ tab.label }}
        </button>
      </div>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import type { IChatFilterTab } from '~/types/chats'

interface Props {
  filterKey: string
}

const props = defineProps<Props>()
const emit = defineEmits(['select'])

const TABS: IChatFilterTab[] = [
  { label: 'Все', key: 'all' },
  { label: 'Закрепленные', key: 'pinned' },
  { label: 'Новое', key: 'unread' },
  // { label: 'Обсуждение', key: 'discussion' },
  // @ts-ignore
  // { label: 'Тестовый лейбл', key: 'test' }
]
</script>
