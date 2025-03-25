<template>
    <el-select
        v-model="geoValue"
        multiple
        filterable
        remote
        reserve-keyword
        placeholder="Введите город"
        collapse-tags
        :remote-method="geo.filteredGeoList"
        :max-collapse-tags="2"
        :loading="geo.filter_loading_geo"
        >
        <el-option
            v-for="item in geo.geo_options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        />
        <template #loading>
            <el-icon class="is-loading">
            <svg class="circular" viewBox="0 0 20 20">
                <g
                class="path2 loading-path"
                stroke-width="0"
                style="animation: none; stroke: none"
                >
                <circle r="3.375" class="dot1" rx="0" ry="0" />
                <circle r="3.375" class="dot2" rx="0" ry="0" />
                <circle r="3.375" class="dot4" rx="0" ry="0" />
                <circle r="3.375" class="dot3" rx="0" ry="0" />
                </g>
            </svg>
            </el-icon>
        </template>
    </el-select>
</template>


<script setup lang="ts">
import { useGeoStore } from '~/stores/geo'

const props = defineProps({
  value: {
    type: Object,
    required: true
  },
})

let geoValue = ref(props.value)

const geo = useGeoStore();
</script>