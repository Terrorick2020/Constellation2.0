<template>
  <el-popover
    :show-arrow="false"
    :persistent="false"
    :width="310"
    :hide-after="0"
    v-model:visible="optionsVisible"
    placement="left-start"
    trigger="click"
    popper-class="!p-5 !rounded-2xl !shadow-[0px_0px_50px_0px] !shadow-black/20"
  >
    <template #reference>
      <slot name="reference" />
    </template>
    <template #default>
      <div class="divide-y" v-click-outside="closePopover">
        <button
          v-for="listItem in props.list"
          :key="listItem.key"
          class="flex w-full items-center gap-x-4 py-3 first:pt-0 last:pb-0"
          @click="handleClickOption(listItem)"
        >
          <component
            v-if="listItem.icon"
            :is="`svgo-${listItem.icon}`"
            :font-controlled="false"
            class="size-6 !fill-transparent text-[#E44820]"
            :key="`popover-${listItem.key}`"
          />
          <span class="text-base font-extrabold text-black">
            {{ listItem.label }}
          </span>
        </button>
      </div>
    </template>
  </el-popover>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router' 
import { ClickOutside as vClickOutside } from 'element-plus'
import type { TPopoverItemProps } from '~/types/UI/popover'

const optionsVisible = ref(false)
const router = useRouter()  // Используем useRouter для доступа к маршрутизатору

interface Props {
  list: TPopoverItemProps[]
  slug: string
  setTable?: (value: boolean) => void
}

const props = defineProps<Props>()
const emit = defineEmits(['select'])

const closePopover = () => {
  optionsVisible.value = false
}

const handleClickOption = (listItem: TPopoverItemProps) => {
  emit('select', listItem)
  closePopover()
  
  if (listItem.key === 'viewdoc') {
    // Переход с использованием Vue Router
    router.push(`/docs/${props.slug}`)
  }

  if (listItem.key === 'statistics') {
    props.setTable( true )
  }
}
</script>
