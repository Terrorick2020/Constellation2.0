<template>
  <div class="flex items-center block-wrapper settings-userInfo gap-[10px]">
    <el-avatar :size="48" :src="$images['avatar']" />
    <div class="flex flex-col gap-[4px]">
      <span class="font-bold">{{ username }}</span>
      <span class="text-xs opacity-40">{{ t('profile.academyName') }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { useAuthStore } from '~/stores/auth'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'UserInfo',
  setup() {
    const authStore = useAuthStore()
    const { locale, t } = useI18n()

    onMounted(() => {
      const savedLang = localStorage.getItem('user-lang')
      if (['en', 'ru', 'be'].includes(savedLang || '')) {
        locale.value = savedLang!
      }
    })

    return {
      username: authStore.username,
      t
    }
  }
})
</script>
