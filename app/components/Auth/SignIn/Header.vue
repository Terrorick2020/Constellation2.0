<template>
    <h2 class="title mt-1">{{ $t( `${props.basePath}.header` ) }}</h2>
</template>

<script setup lang="ts">
const props = defineProps<{
    basePath: string
}>()
</script>