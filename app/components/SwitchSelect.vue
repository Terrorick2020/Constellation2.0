<template>
    <div class="flex justify-between w-full pt-[5px]">
        <div class="switch-label">{{ label }}</div>
        <el-switch class="switch-field" v-model="switchValue" />
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
  value: {
    type: Boolean,
    required: true
  },
  label: {
    type: String,
  }
})

let switchValue = ref(props.value)

</script>