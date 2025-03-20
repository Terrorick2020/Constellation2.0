<template>
  <NuxtLink
    :to="link.path"
    class="flex items-center gap-[10px] text-[14px] transition-all"
    :class="[mobile ? 'flex-col items-center justify-center' : 'flex-row']"
  >
    <component
      :is="`svgo-${link.iconName}`"
      :class="['h-6 w-6', opacityClasses]"
      :fontControlled="false"
      v-bind:color="link.color"
      filled
    />
    <span v-if="!mobile || isActive" :class="['font-extrabold', opacityClasses]">
      {{ link.title }}
    </span>
  </NuxtLink>
</template>

<script setup>
const props = defineProps({
  link: {
    type: Object,
    required: true
  },
  mobile: {
    type: Boolean,
    default: false
  },
  useOpacity: {
    type: Boolean,
    default: true
  }
})

const route = useRoute()

const isActive = computed(() => {
  return (
    (route.path.startsWith(props.link.path) && props.link.path !== '/') ||
    (props.link.path === '/' && route.path === '/')
  )
})

const opacityClasses = computed(() => {
  return isActive.value || !props.useOpacity ? 'opacity-100' : 'opacity-40 hover:opacity-50'
})
</script>
