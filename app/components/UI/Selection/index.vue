<template>
    <el-collapse
        class="w-full list selection"
        accordion
        v-model="activeNames"
        v-for="elem in selectionList"
    >
        <UISelectionItem 
            :name="elem.id"
            :title="elem.title"
            :elemList="elem.items"
            :warnMoreThen="props.warnMoreThen"
            :errorZeroLen="props.errorZeroLen"
        />
    </el-collapse>
</template>

<script setup lang="ts">
import { SignUpRT } from '~/env/requests.env'
import { useAuthStore } from '~/stores/auth'
import { useProfileStore } from '~/stores/profile'

import type {
    SelVariable,
    NewSelectionItem,
    WorkFieldBlock,
    FieldBlockChilde,
    BlockChildeItem
} from '~/types/auth/sign-up'


const props = defineProps<{
    setLoading: () => void | undefined,
    warnMoreThen: () => void | undefined,
    errorZeroLen: () => void | undefined,
}>()

const authStore = useAuthStore()
const { workFields } = useProfileStore()

const activeNames = ref(['1'])
const selectionList: Ref<NewSelectionItem[]> = ref([])

const onMountedGetWorkFieldBlocks = async () => {
    let NewSelectionList: NewSelectionItem[] = reactive( [] )

    const response = await authStore.getSingUpData( SignUpRT.workFieldBlocks )
    let data: FieldBlockChilde[] = []

    response.data.forEach( (item: WorkFieldBlock) => {
        data.push( ...item.children )
    })

    data.forEach( (elem: FieldBlockChilde) => {
        let selVarList: SelVariable[]  = []

        elem.children.forEach( (item: BlockChildeItem) => {
            selVarList.push( {
                id: item.id,
                label: item.name,
                value: workFields.includes( item.id ),
            })
        })

        NewSelectionList.push({
            id: elem.id,
            title: elem.name,
            isShow: false,
            items: [ ...selVarList ],
        })
    })

    selectionList.value = NewSelectionList

    if ( props.setLoading ) props.setLoading( false )
}

onMounted( () => {
    onMountedGetWorkFieldBlocks()
})
</script>