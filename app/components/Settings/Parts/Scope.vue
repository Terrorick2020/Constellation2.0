<!-- <template>
    <el-form class="flex min-h-[600px] w-full flex-col">
        <span class="settings-title mb-[10px]">Выберите категории, которые хотели бы изменить</span>
        <p>Текущий язык: {{ $i18n.locale }}</p>

        <div class="settings-scope" v-for="scope in store.scopes" :key="scope.id">
            <el-collapse>
                <el-collapse-item>
                    <template #title>
                        <div class="mr-[auto]">{{ scope.name }}</div>
                    </template>

                    <div
                        class="settings-scope-item flex justify-between pl-[20px]"
                        v-for="subscope in scope.scopes"
                        :key="subscope.id"
                    >
                        <div class="settings-scope-title">{{ subscope.name }}</div>
                        <el-radio
                            v-model="selectedScopes[scope.id]" 
                            :label="subscope.id" 
                            class="radio-no-label"
                        />
                    </div>
                </el-collapse-item>
            </el-collapse>
        </div>
        <div class="theme flex items-center justify-between mt-[20px]">
            <big class="theme-label">{{ t('theme.label') }}</big>
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
import { reactive, ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useSettingsStore } from '~/stores/settings'

type SupportedLocales = 'en' | 'ru' | 'zh'

const { locale, t } = useI18n()
const store = useSettingsStore()

const selectedScopes = reactive<{
  language: SupportedLocales
}>({
  language: 'ru'
})

const isDarkTheme = ref(false)

onMounted(() => {
  const saved = localStorage.getItem('user-lang')
  if (saved === 'en' || saved === 'ru' || saved === 'zh') {
    selectedScopes.language = saved
    locale.value = saved
  }
})

const saveSelection = () => {
  const newLang = selectedScopes.language
  console.log('Устанавливаем язык:', newLang)

  locale.value = newLang
  console.log('Текущий locale.value:', locale.value)
  localStorage.setItem('user-lang', newLang)
}

const toggleTheme = () => {
  if (isDarkTheme.value) {
    document.documentElement.classList.add('dark-theme')
    document.documentElement.classList.remove('light-theme')
  } else {
    document.documentElement.classList.add('light-theme')
    document.documentElement.classList.remove('dark-theme')
  }
}
</script>




<style scoped lang="scss">
.radio-no-label .el-radio__label {
    display: none; 
}
</style> -->
<template>
  <el-form class="flex min-h-[600px] w-full flex-col">
    <span class="settings-title mb-[10px]">{{ t('settings.title') }}</span>
    <p>{{ t('settings.currentLanguage') }} {{ $i18n.locale }}</p>

    <div class="settings-scope" v-for="scope in store.scopes" :key="scope.id">
      <el-collapse>
        <el-collapse-item>
          <template #title>
            <div class="mr-[auto]">{{ scope.name }}</div>
          </template>

          <div
            class="settings-scope-item flex justify-between pl-[20px]"
            v-for="subscope in scope.scopes"
            :key="subscope.id"
          >
            <div class="settings-scope-title">{{ subscope.name }}</div>
            <el-radio
              v-model="selectedScopes[scope.id]"
              :label="subscope.id"
              class="radio-no-label"
            />
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>

    <div class="theme flex items-center justify-between mt-[20px]">
      <big class="theme-label">{{ t('settings.theme.label') }}</big>
      <el-switch
        v-model="isDarkTheme"
        active-color="#13ce66"
        inactive-color="#ff4949"
        @change="toggleTheme"
      />
    </div>

    <el-button round class="btn-main" @click="saveSelection">{{ t('settings.save') }}</el-button>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useSettingsStore } from '~/stores/settings'

type SupportedLocales = 'en' | 'ru' | 'be'

const { locale, t } = useI18n()
const store = useSettingsStore()

const selectedScopes = reactive<{
  language: SupportedLocales
}>({
  language: 'ru'
})

const isDarkTheme = ref(false)

onMounted(() => {
  const saved = localStorage.getItem('user-lang')
  if (saved === 'en' || saved === 'ru' || saved === 'be') {
    selectedScopes.language = saved
    locale.value = saved
  }
})

const saveSelection = () => {
  const newLang = selectedScopes.language
  locale.value = newLang
  localStorage.setItem('user-lang', newLang)
  // 💡 Опционально: перезагрузить страницу или обновить UI, если нужно
}

const toggleTheme = () => {
  if (isDarkTheme.value) {
    document.documentElement.classList.add('dark-theme')
    document.documentElement.classList.remove('light-theme')
  } else {
    document.documentElement.classList.add('light-theme')
    document.documentElement.classList.remove('dark-theme')
  }
}
</script>

<style scoped lang="scss">
.radio-no-label .el-radio__label {
  display: none;
}
</style>