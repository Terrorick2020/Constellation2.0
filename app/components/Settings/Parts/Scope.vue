<template>
  <el-form class="flex min-h-[600px] w-full flex-col">
    <p style="color: red; font-weight: 800; margin-bottom: 20px; text-align: center">Находиться в разработке...</p>
    <span class="settings-title mb-[10px]">{{ t('settings.title') }}</span>
    

    <div class="settings-scope" v-for="scope in store.scopes" :key="scope.id">
      <el-collapse>
        <el-collapse-item>
          <template #title>
            <div class="mr-[auto]">{{ t(`scopes.${scope.id}`) }}</div>
          </template>

          <div
            class="settings-scope-item flex justify-between pl-[20px]"
            v-for="subscope in scope.scopes"
            :key="subscope.id"
          >
            <div class="settings-scope-title">{{ t(`scopes.${subscope.id}`) }}</div>
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
   const savedTheme = localStorage.getItem('user-theme')
  if (savedTheme === 'dark') {
    isDarkTheme.value = true
    document.documentElement.classList.add('dark')
    document.documentElement.classList.remove('light')
  } else {
    isDarkTheme.value = false
    document.documentElement.classList.add('light')
    document.documentElement.classList.remove('dark')
  }
})

const saveSelection = () => {
  const newLang = selectedScopes.language
  locale.value = newLang
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
</style>