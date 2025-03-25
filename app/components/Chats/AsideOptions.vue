<template>
  <UIPopoverMenu :list="LIST_OPTIONS" @select="onSelect">
    <template #reference>
      <button :class="$attrs['class']" @click.stop="optionsVisible = !optionsVisible">
        <SvgoMoreSmall class="size-4 stroke-[#E44820] stroke-2" :font-controlled="false" />
      </button>
    </template>
  </UIPopoverMenu>
</template>

<script setup lang="ts">
const optionsVisible = ref(false)

const LIST_OPTIONS = [
  { key: 'muted', label: 'Выкл. звук', icon: 'volumeUpOutline' },
  { key: 'pin', label: 'Закрепить', icon: 'pinOutline' },
  { key: 'archive', label: 'Архивировать', icon: 'archive' },
  { key: 'report', label: 'Пожаловаться', icon: 'flagOutline' },
  { key: 'block', label: 'Заблокировать', icon: 'closeCircleOutline' }
]

const onSelect = (option: (typeof LIST_OPTIONS)[0]) => {
  console.log('option', option)
}
</script>
