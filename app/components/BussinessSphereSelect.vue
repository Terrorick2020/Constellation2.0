<template>
    <el-select
        v-model="scopeActivityValue"
        multiple
        filterable
        remote
        reserve-keyword
        placeholder="Выберите сферу деятельности"
        collapse-tags
        :remote-method="spheres.filteredScopeActivityList"
        :max-collapse-tags="2"
        :loading="spheres.filter_loading_scope_activity"
    >
        <el-option
        v-for="item in spheres.scope_activity_options"
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
import { useSpheresStore } from '~/stores/bussiness_spheres'

const props = defineProps({
  value: {
    type: Object,
    required: true
  },
})

let scopeActivityValue = ref(props.value)

const spheres = useSpheresStore();
</script>