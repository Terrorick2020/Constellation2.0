<template>
  <NuxtLink
    :to="link.path"
    class="flex items-center gap-[10px] text-[14px] transition-all"
    :class="[mobile ? 'flex-col items-center justify-center' : 'flex-row']"
  >
    <el-badge is-dot :hidden="!link.isBadge" class="item mr-[10px]">
      <component
        :is="`svgo-${link.iconName}`"
        :class="['h-6 w-6', opacityClasses]"
        :fontControlled="false"
        v-bind:color="link.color"
        filled
      />
    </el-badge>
    <span v-if="!mobile || isActive" :class="['font-extrabold', opacityClasses]">
      {{ link.title }}
    </span>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { Badges } from '~/types/props'
import { PropType } from 'vue'


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
  },
  setBadges: {
    type: Function as PropType<(newBadges: Badges) => void>,
    default: () => {}
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
