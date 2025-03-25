<template>
    <div class="block-wrapper">
        <div class="w-full flex flex-row justify-between items-center">
            <el-skeleton style="--el-skeleton-circle-size: 100px" class="mt-10" animated>
                <template #template>
                    <el-skeleton-item variant="circle" />
                </template>
            </el-skeleton>
            <el-skeleton :rows="0" animated class="flex justify-end" />
        </div>
        <el-skeleton animated class="mt-10" />
    </div>
    <el-skeleton :rows="0" animated class="mt-10" />
    <div class="w-full flex flex-wrap gap-5 flex-row justify-between max-[700px]:justify-center max-[700px]:gap-10  mb-10">
        <el-skeleton
            v-for="item in computedImgCount"
            style="width: 160px"
            animated
        >
            <template #template>
                <el-skeleton-item
                    variant="image"
                    style="width: 160px; height: 160px; border-radius: 8px;" 
                />
            </template>
        </el-skeleton>
    </div>
</template>

<script setup lang="ts">
import { LOAD_IMG_COUNT } from '~/constants/profile'

const computedImgCount = computed( () => Array(LOAD_IMG_COUNT).fill(0).map((_, i) => i + 1) )
</script>