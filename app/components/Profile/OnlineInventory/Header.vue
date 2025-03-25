<template>
  <div class="flex gap-[10px]">
    <div
      class="overflow-hidden rounded-full"
      :class="[
        indexPage
          ? 'h-[34px] w-[34px] lg:h-[24px] lg:w-[24px]'
          : 'h-[48px] w-[48px] lg:h-[48px] lg:w-[48px]'
      ]"
    >
      <component
        :is="iconComponent"
        filled
        :class="[indexPage ? 'text-[34px] lg:text-[24px]' : 'text-[48px] lg:text-[48px]']"
      />
    </div>
    <div class="flex flex-col items-start" :class="[indexPage ? 'hidden lg:block' : '']">
      <div class="font-bold first-letter:uppercase" :class="[indexPage ? 'text-sm' : 'text-xl']">
        {{ socialName }}
      </div>
      <div v-if="!indexPage" class="flex gap-2 text-base font-medium">
        <div class="flex items-center gap-[2px]">
          <SvgoPeople />
          <span> {{ peopleCount }}</span>
        </div>
        <div class="flex items-center gap-[2px]">
          <SvgoEye />
          <span> {{ viewCount }} </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  indexPage: {
    type: Boolean,
    default: false
  },
  peopleCount: {
    type: String,
    default: '0'
  },
  viewCount: {
    type: String,
    default: '0'
  },
  socialName: {
    type: String,
    default: 'telegram'
  }
})

const iconComponent = computed(() => {
  return defineAsyncComponent(() => import(`~/assets/icons/${props.socialName}.svg`))
})
</script>
