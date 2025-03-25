<template>
    <el-radio-group v-model="workFieldParent" class="radio-list" v-if="workFieldParent !== null">
        <el-radio   v-for="(item, index) in workFieldParentList"
                    :key="item.id"
                    :value="index"
                    border
                    class="radio-item inner-form-widget">
            {{ item.name }}
        </el-radio>
    </el-radio-group>

    <el-skeleton 
        v-if="!workFieldParentList.length"
        :rows="4"
        animated 
    />
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'
import { useProfileStore } from '~/stores/profile'
import { SignUpRT } from '~/env/requests.env'

import type { WorkFieldParent } from '~/types/auth/sign-up'


const authStore = useAuthStore()
const profileStore = useProfileStore()

const workFieldParent: Ref<number | null> = ref( null )
const workFieldParentList: Ref<WorkFieldParent[]> = ref( [] )

const mountedGetWorkFieldsParents = async () => {
    const data = await authStore.getSingUpData( SignUpRT.workFieldParents )
    if ( data ) {
        workFieldParent.value = profileStore.companyType ? profileStore.companyType - 1 : 0
        workFieldParentList.value = data.data
        profileStore.companyType = data.data[ workFieldParent.value ].id
    }
}

onMounted( () => {
    mountedGetWorkFieldsParents()
} )

watch(
    () => workFieldParent.value,
    ( newValue ) => {
        if ( newValue !== null ) {
            profileStore.companyType = workFieldParentList.value[ newValue ].id
        }
    }
)
</script>