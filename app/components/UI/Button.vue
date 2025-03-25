<template>
  <button :class="buttonClasses" ref="ref">
    <component
      v-if="props.iconName"
      :is="`svgo-${props.iconName}`"
      :class="['h-6 w-6 min-w-max', props.color ? 'fill-white' : 'fill-black']"
      :font-controlled="false"
      filled
    />

    <div 
      v-if="slots?.default" 
      :class="['font-extrabold', props.color ? 'text-white' : 'text-black']"
    >
      <slot />
    </div>

    <div
      v-if="isShowCounter"
      class="flex h-6 w-6 items-center justify-center rounded-full bg-main-gradient text-xs font-extrabold text-white"
    >
      {{ props.counter }}
    </div>
  </button>
</template>

<script setup lang="ts">
import type { TUIButton } from '~/types/UI/button'

const props = defineProps<TUIButton>()
const slots = useSlots()
const ref = useTemplateRef('ref')

const isShowCounter = computed(() => typeof props.counter === 'number')

const buttonClasses = computed(() => {
  const defaultClasses = 'flex min-h-[60px] items-center justify-center gap-x-[5px] px-5 transition-colors leading-[110%]';

  return [
  props.color ? 'ui-button-color' : 'border border-black/15 hover:border-black/30 active:border-black',
    { 'w-full': props.full },
    { 'w-[60px]': !slots?.default },
    props.round ? 'rounded-full' : 'rounded-2xl',
    defaultClasses
  ]
})

defineExpose({ ref })
</script>
