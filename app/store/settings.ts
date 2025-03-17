import { defineStore } from 'pinia'
import { Theme, NotificType } from '~/types/settings'


export const useSettingsStore = defineStore('SettingsStore', () => {
    const isLoad = ref<boolean>( false )
    const theme = ref<Theme>( Theme.light )

    const notific = reactive({
        value:   false,
        type:    NotificType.success,
        title:   '',
        message: '',
    })

    return {
        isLoad,
        theme,

        notific,
    }
})
