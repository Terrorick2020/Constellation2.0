<template>
  <div class="flex flex-col gap-2">
    <div class="flex w-full overflow-hidden rounded-2xl">
      <template v-for="item in genderData" :key="item.type">
        <div
          class="flex gap-1 p-[15px] text-white"
          :class="[
            item.bgClass,
            {
              'flex-row items-center lg:flex-col': indexPage,
              [item.type === 'male' ? 'justify-start lg:items-start' : 'justify-end lg:items-end']:
                indexPage
            }
          ]"
          :style="{ minWidth: `${item.value}%` }"
        >
          <div
            class="flex text-sm leading-none"
            :class="{
              'font-bold opacity-100 lg:font-light lg:opacity-60': indexPage,
              'font-light opacity-60': !indexPage
            }"
          >
            <span>{{ item.letter }}</span>
            <span :class="{ 'block lg:hidden': indexPage }">-</span>
            <span :class="{ 'hidden lg:block': indexPage }">{{ item.fullText }}</span>
          </div>
          <span class="leading-none">{{ item.value }}%</span>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  indexPage: {
    type: Boolean,
    default: false
  },
  malePercent: {
    type: Number,
    default: 38
  }
})

const genderData = computed(() => [
  {
    type: 'male',
    letter: 'М',
    fullText: 'ужчины',
    value: props.malePercent,
    bgClass: 'bg-blue-man'
  },
  {
    type: 'female',
    letter: 'Ж',
    fullText: 'енщины',
    value: 100 - props.malePercent,
    bgClass: 'bg-main-gradient'
  }
])
</script>
