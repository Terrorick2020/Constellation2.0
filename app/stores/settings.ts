import { defineStore } from 'pinia'
import type { UploadUserFile } from 'element-plus'
import logo from '~/assets/image/avatar.jpg'
import { fa } from 'element-plus/es/locales.mjs'

type Scope = {
    id: string;
    name: string;
    scopes?: Scope[]
    
}

export const useSettingsStore = defineStore('settings', () => {
    const { $api } = useNuxtApp()
    // TODO:Удалить линки
    const mediaList = ref<UploadUserFile[]>([
        // {
        //     name: 'food.jpeg',
        //     url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
        // },
        // {
        //     name: 'food.jpeg',
        //     url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
        // },
        // {
        //     name: 'food.jpeg',
        //     url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
        // },
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
        media: mediaList,
        site: '',
        password: [],
        rank:[]
    });

    const scopes: Scope[] = [
        {
            id: 'language',
            name: 'Язык',
            scopes: [
                {
                    id: 'English',
                    name: 'Английский'
                },
                {
                    id: 'Russian',
                    name: 'Русский'
                },
                {
                    id: 'Chinese',
                    name: 'Китайский'
                },
            ]
        },
        {
            id: 'theme ',
            name: 'Тема',
            scopes: [
                {
                    id: 'light',
                    name: 'Cветлая',

                },
                {
                    id: 'Dark',
                    name: 'Темная',

                },
            ]
        },
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