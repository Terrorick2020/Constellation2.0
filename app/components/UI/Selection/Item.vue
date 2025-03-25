<template>
    <el-collapse-item
        :name="props.name"
        icon=""
        class="w-full"
    >
        <template #title >
            <el-icon class="header-icon">
                <ArrowRightBold />
            </el-icon>
            <h3 class="collapse-title">
                {{ props.title }}
            </h3>
        </template>
        <ul class="w-full p-1">
            <li v-for="item in props.elemList"
                :key="item.id"
                class="content__item flex flex-row justify-between items-center"
            >
                <p class="item__title">{{ item.label }}</p>
                <div class="item__box flex flex-row items-center">
                    <p v-if="item.value" class="mr-3 font-bold text-[##00000080]">
                        {{ profileStore.workFields.indexOf( item.id ) + 1 }}
                    </p>
                    <el-checkbox
                        v-model="item.value"
                        @change="handleCheckboxChange(item)"
                    >
                    </el-checkbox>
                </div>
            </li>
        </ul>
    </el-collapse-item>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'
import { useProfileStore } from '~/stores/profile'
import { ArrowRightBold } from '@element-plus/icons-vue'

import type { SelVariable } from '~/types/auth/sign-up'


const props = defineProps<{
    name: number,
    title: string,
    elemList: SelVariable[],
    warnMoreThen: () => void | undefined,
    errorZeroLen: () => void | undefined,
}>()

const authStore = useAuthStore()
const profileStore = useProfileStore()

const handleCheckboxChange = ( item: SelVariable ) => {
    if ( item.value ) {
        if ( profileStore.workFields.length < 3 ) {
            profileStore.workFields.push( item.id )
        } else {
            item.value = false

            if ( props.warnMoreThen ) props.warnMoreThen()
        }
    } else {
        profileStore.workFields = profileStore.workFields.filter( (id: number) => id !== item.id )
        console.log( profileStore.workFields )
    }

    if ( props.errorZeroLen ) props.errorZeroLen()
}
</script>