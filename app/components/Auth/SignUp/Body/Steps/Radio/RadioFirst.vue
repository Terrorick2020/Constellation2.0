<template>
    <el-radio-group v-model="profileType" class="radio-list" v-if="profileType !== null">
        <el-radio   v-for="(item, index) in profileTypeList"
                    :key="item.id"
                    :value="index"
                    border
                    class="radio-item inner-form-widget">
            {{ item.name }}
        </el-radio>
    </el-radio-group>

    <el-skeleton 
        v-if="!profileTypeList.length"
        :rows="4"
        animated 
    />
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'
import { useProfileStore } from '~/stores/profile'
import { SignUpRT } from '~/env/requests.env'

import type { ProfileType } from '~/types/auth/sign-up'


const authStore = useAuthStore()
const profileStore = useProfileStore()

const profileType: Ref<number | null> = ref( null )
const profileTypeList: Ref<ProfileType[]> = ref( [] )

const mountedGetProfileTypes = async () => {
    const data = await authStore.getSingUpData( SignUpRT.profileTypes )
    if ( data ) {
        profileType.value = profileStore.profileType ? profileStore.profileType - 1 : 0
        profileTypeList.value = data.data
        profileStore.profileType = data.data[ profileType.value ].id
    }
}

onMounted(() => {
    mountedGetProfileTypes()
})

watch(() => profileType.value,
    (newValue) => {
        if ( newValue !== null ) {
            profileStore.profileType = profileTypeList.value[ newValue ].id
        }
    }
)
</script>
