<template>
  <div class="flex flex-col" :class="blockClasses">
    <span class="opacity-40" :class="labelClasses">{{ label }}</span>
    <span class="font-bold" :class="valueClasses">{{ value }}</span>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  label: string
  value: string
  indexPage: boolean
}>()

const blockClasses = computed(() => ({
  'gap-[6px]': props.indexPage,
  'gap-[10px]': !props.indexPage
}))

const labelClasses = computed(() => ({
  'text-xs leading-none': props.indexPage,
  'text-sm font-bold': !props.indexPage
}))

const valueClasses = computed(() => ({
  'text-sm leading-none': props.indexPage,
  'text-xl': !props.indexPage
}))
</script>
