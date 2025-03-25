<template>
    <el-radio-group v-model="profileLegalForm" class="radio-list" v-if="profileLegalForm !== null">
        <el-radio   v-for="(item, index) in profileLegalFormList"
                    :key="item.id"
                    :value="index"
                    border
                    class="radio-item inner-form-widget">
            {{ item.name }}
        </el-radio>
    </el-radio-group>

    <el-skeleton 
        v-if="!profileLegalFormList.length"
        :rows="4"
        animated 
    />
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'
import { useProfileStore } from '~/stores/profile'
import { SignUpRT } from '~/env/requests.env'

import type { ProfileLegalForm } from '~/types/auth/sign-up'


const authStore = useAuthStore()
const profileStore = useProfileStore()

const profileLegalForm: Ref<number | null> = ref( null )
const profileLegalFormList: Ref<ProfileLegalForm[]> = ref( [] )

const mountedGetProfileLegalForms = async () => {
    const data = await authStore.getSingUpData( SignUpRT.profileLegalForms )
    if ( data ) {
        profileLegalForm.value = profileStore.legalForm ? profileStore.legalForm - 1 : 0
        profileLegalFormList.value = data.data
        profileStore.legalForm = data.data[ profileLegalForm.value ].id
    }
}

onMounted( () => {
    mountedGetProfileLegalForms()
})

watch(
    () => profileLegalForm.value,
    (newValue) => {
        if ( newValue !== null ) {
            profileStore.legalForm = profileLegalFormList.value[ newValue ].id
        }
    }
)
</script>