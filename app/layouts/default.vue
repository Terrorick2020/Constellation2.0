<template>
    <div class="wrapper" :id="settingsStore.theme">
        <slot/>
    </div>
</template>

<script setup lang="ts">
import { useSettingsStore } from '~/store/settings'
import { type NotificType } from '~/types/settings'
import { ElNotification } from 'element-plus'
import { ElMessage } from 'element-plus'


const settingsStore = useSettingsStore()

const notificBlock = ( title: string, message: string, type: NotificType ) => {
    if ( window.innerWidth >= 700 ) {
        ElNotification({
            title,
            message,
            type,
            position: 'bottom-right'
        })
    } else {
        ElMessage[ type ]( message )
    }
}

watch(
  () => settingsStore.notific.value,
  ( newVal ) => {
    if ( newVal ) {
        notificBlock(
            settingsStore.notific.title,
            settingsStore.notific.message,
            settingsStore.notific.type,
        )
    }

    settingsStore.notific.value   = false
    settingsStore.notific.title   = ''
    settingsStore.notific.message = ''
  }
)
</script>