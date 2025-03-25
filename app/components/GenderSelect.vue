<template>
    <div class="flex flex-col items-center justify-center">
        <el-slider class="relative z-[99999]" v-model="man" :show-tooltip="false" />
        <div class="flex w-full justify-between leading-none">
        <div class="flex flex-col gap-1">
            <span class="opacity-70">Мужчины</span>
            <span class="font-bold">{{ man }}%</span>
        </div>
        <div class="flex flex-col items-end gap-1">
            <span class="opacity-70">Женщины</span>
            <span class="font-bold">{{ 100 - man }}%</span>
        </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    
const props = defineProps({
  value: {
    type: Number,
    required: true
  },
})
const man = ref(props.value);

</script>