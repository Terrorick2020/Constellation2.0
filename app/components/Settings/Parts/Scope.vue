<template>
    <el-form class="flex min-h-[600px] w-full flex-col">
        <span class="settings-title mb-[10px]">Выберите категории, которые хотели бы изменить</span>

        <!-- Цикл по основным категориям -->
        <div class="settings-scope" v-for="scope in store.scopes" :key="scope.id">
            <el-collapse>
                <el-collapse-item>
                    <template #title>
                        <div class="mr-[auto]">{{ scope.name }}</div>
                    </template>

                    <!-- Группа радиокнопок -->
                    <div
                        class="settings-scope-item flex justify-between pl-[20px]"
                        v-for="subscope in scope.scopes"
                        :key="subscope.id"
                    >
                        <div class="settings-scope-title">{{ subscope.name }}</div>
                        <el-radio
                            v-model="selectedScopes[scope.id]" 
                            :label="subscope.name" 
                            class="radio-no-label"
                        />
                    </div>
                </el-collapse-item>
            </el-collapse>
        </div>
        <div class="theme flex items-center justify-between mt-[20px]">
            <big class="theme-label">Выберите цвет темы</big>
            <el-switch
                v-model="isDarkTheme"
                active-color="#13ce66"
                inactive-color="#ff4949"
                @change="toggleTheme"
            />
        </div>

        <el-button round class="btn-main" @click="saveSelection">Сохранить</el-button>
    </el-form>
</template>


<script lang="ts" setup>
import { useSettingsStore } from '~/stores/settings'
import { reactive, ref } from 'vue'

// Инициализация хранилища
const store = useSettingsStore()

// Реактивное состояние для выбранных значений
const selectedScopes = reactive<Record<string, string>>({})

// Состояние для темы
const isDarkTheme = ref(false) // false = светлая тема, true = темная тема

// Функция для переключения темы
const toggleTheme = () => {
    if (isDarkTheme.value) {
        document.documentElement.classList.add('dark-theme')
        document.documentElement.classList.remove('light-theme')
    } else {
        document.documentElement.classList.add('light-theme')
        document.documentElement.classList.remove('dark-theme')
    }
}

// Функция для проверки и сохранения выбранных категорий
</script>




<style scoped lang="scss">
.radio-no-label .el-radio__label {
    display: none; /* Скрывает текст внутри радиокнопки */
}
</style>