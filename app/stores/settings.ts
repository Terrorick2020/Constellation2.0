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

    const mediaList = ref<UploadUserFile[]>([
        {
            name: 'food.jpeg',
            url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
        },
        {
            name: 'food.jpeg',
            url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
        },
        {
            name: 'food.jpeg',
            url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
        },
    ])

    const common = reactive({
        name: 'Britva',
        url: 'britva_ru',
        geo: [],
        descritor: '',
        description: '',
        wholeRussia: false,
        hideAddress: false,
        logo,
        media: mediaList,
        site: ''
    });

    const scopes: Scope[] = [
        {
            id: 'services',
            name: 'Услуги',
            scopes: [
                {
                    id: 'health',
                    name: 'Здоровье и медицина'
                },
                {
                    id: 'sport',
                    name: 'Спорт и фитнес'
                },
                {
                    id: 'home',
                    name: 'Бытовые услуги'
                },
            ]
        },
        {
            id: 'building',
            name: 'Строительство',
            scopes: [
                {
                    id: 'repair',
                    name: 'Ремонт',
                    scopes: [
                        {
                            id: 'tech',
                            name: 'Бытовая техника'
                        },
                        {
                            id: 'house',
                            name: 'Оштукатуривание'
                        },
                    ]
                },
                {
                    id: 'build-sip',
                    name: 'Строительство домов из SIP панелей'
                },
            ]
        },
        {
            id: 'entertainments',
            name: 'Услуги',
            scopes: [
                {
                    id: 'cinema',
                    name: 'Кинотеатр'
                },
                {
                    id: 'pc-games',
                    name: 'Компьютерный клуб'
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