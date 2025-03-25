<template>
    <el-form class="flex min-h-[600px] w-full flex-col">
        <span class="settings-title mb-[10px]">Портрет клиентов</span>
        <span class="settings-subtitle">Опишите рекальный профиль клиентов вашего бизнеса</span>
            
        <span class="font-bold">ГЕО</span>
        <el-form-item prop="common.location" label="Где находится бизнес Ваших клиентов?" label-width="16" label-position="top" hide-require-asterisk>
            <GeoSelect v-bind:value="store.clientsPortrain.geo"/>
            <SwitchSelect label="Вся Россия" v-bind:value="store.clientsPortrain.wholeRussia"/>
        </el-form-item>
        
        <span class="font-bold">Пол аудитории</span>
        <el-form-item prop="clientsPortrain.man" label-width="16" label-position="top" hide-require-asterisk>
            <GenderSelect class="w-full" v-bind:value="store.clientsPortrain.man"/>
        </el-form-item>
        
        <span class="font-bold mb-[10px]">Возраст</span>
        <el-form-item prop="clientsPortrain.age" label-width="16" label-position="top" hide-require-asterisk>
            <TagSelect v-bind:values="store.clientsPortrain.age" :tags="AGE_GROUPS" />
        </el-form-item>
        
        <span class="font-bold mb-[10px]">Интересы аудитории</span>
        <el-form-item prop="clientsPortrain.scopeActivity" label-width="16" label-position="top" hide-require-asterisk>
            <bussiness-sphere-select v-bind:value="store.clientsPortrain.scopeActivity"/>
        </el-form-item>
        
        <span class="font-bold mb-[10px]">В каком сегменте рынка вы работаете</span>
        <el-form-item prop="clientsPortrain.price" label-width="16" label-position="top" hide-require-asterisk>
            <TagSelect v-bind:values="store.clientsPortrain.price" :tags="PRICE_GROUPS" />
        </el-form-item>

        <span class="font-bold pb-[10px]">Точное описание</span>
        <el-form-item prop="clientsPortrain.description" label="В свободной форме опишите ядро и потребности аудитории, так как вас будет найти проще" label-width="16" label-position="top" hide-require-asterisk>
            <el-input type="textarea" placeholder="Введите описание..." size="large" v-model="store.clientsPortrain.description"/>
            <div class="text-xs mt-[10px]">
                <span class="opacity-40">Осталось символов: </span>
                <span class="font-bold">{{ descriptionWidth }}</span>
            </div>
        </el-form-item>

        <el-button round class="btn-main">Сохранить</el-button>
    </el-form>
</template>


<script lang="ts" setup>
import { useSettingsStore } from '~/stores/settings'
import {MAX_DESCRIPTION_WIDTH, AGE_GROUPS, PRICE_GROUPS} from '~/constants/settings';

const store = useSettingsStore();

const descriptionWidth = ref(MAX_DESCRIPTION_WIDTH - store.common.description.length);

</script>
