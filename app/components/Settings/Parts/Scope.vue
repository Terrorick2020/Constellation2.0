<template>
    <el-form class="flex min-h-[600px] w-full flex-col">
        <span class="settings-title mb-[10px]">Выберите категорий, которые хотели бы изменить</span>
        <!-- <span class="settings-subtitle">Выберите до 3х категорий. Начинайте с основной </span> -->
        
        <div class="settings-scope" v-for="scope in store.scopes" :key="scope.id" >
            <el-collapse>
                <el-collapse-item>
                    <template #title>
                        <!-- <el-checkbox class="pr-[20px]" /> -->
                        <div class="mr-[auto]">{{ scope.name }}</div>
                    </template>
                    <!-- TODO:Сделать ограничение для checkbox -->
                    <div class="settings-scope-item flex justify-between pl-[20px]" v-for="subscopes in scope.scopes" :key="subscopes.id">
                        <div class="settings-scope-title">{{ subscopes.name }}</div>
                        <el-checkbox /> 
                    </div>
                </el-collapse-item>
            </el-collapse>
        </div>

        <el-button round class="btn-main">Сохранить</el-button>
    </el-form>
</template>


<script lang="ts" setup>
import { useSettingsStore } from '~/stores/settings'

const store = useSettingsStore();

</script>
