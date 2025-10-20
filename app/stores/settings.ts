import { defineStore } from 'pinia'
import type { UploadUserFile } from 'element-plus'
// import logo from '~/assets/image/avatar.jpg'
import logo from '~/assets/image/avatar1.png'
import { fa } from 'element-plus/es/locales.mjs'

type Scope = {
    id: string;
    name: string;
    scopes?: Scope[]
    
}

export const useSettingsStore = defineStore('settings', () => {
    const { $api } = useNuxtApp()
    const mediaList = ref<UploadUserFile[]>([
       
    ])

    const common = reactive({
        name: '',
        url: '',
        geo: [],
        descritor: '',
        description: '',
        wholeRussia: false,
        hideAddress: false,
        logo,
        // avatar: '',
        media: mediaList,
        site: '',
        password: [],
        rank:[],
        
    });

    const scopes: Scope[] = [
        {
            id: 'language',
            name: 'Язык',
            scopes: [
                    { id: 'en', name: 'Английский' },
                    { id: 'ru', name: 'Русский' },
                    { id: 'be', name: 'Белорусский' },
            ]
        },
        // {
        //     id: 'theme ',
        //     name: 'Тема',
        //     scopes: [
        //         {
        //             id: 'light',
        //             name: 'Cветлая',

        //         },
        //         {
        //             id: 'Dark',
        //             name: 'Темная',

        //         },
        //     ]
        // },
    ]

    const clientsPortrain = reactive({
        man: 50,
        geo: [],
        wholeRussia: false,
        age: [],
        price: [],
        scopeActivity: [],
        description: ''
        
    })

    return {
        common,
        scopes,
        clientsPortrain,
    }
})