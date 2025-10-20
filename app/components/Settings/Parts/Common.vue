<template>
  <el-form class="flex min-h-[600px] w-full flex-col">
    <span class="settings-title">{{ t('profile.title') }}</span>

    <span class="pb-[10px] font-bold">{{ t('profile.fullName') }}</span>
    <el-form-item prop="common.name" label-width="16" label-position="top" hide-require-asterisk>
      <el-input size="large" v-model="store.common.name" />
    </el-form-item>

    <span class="font-bold">{{ t('profile.division') }}</span>
    <el-input size="large" v-model="store.common.rank" />

    <span class="mt-[18px] font-bold">{{ t('profile.position') }}</span>
    <el-input size="large" v-model="store.common.descritor" />

    <!-- Фото профиля -->
    <div class="mt-[18px] flex flex-col">
      <div class="settings-logo-infoWrapper">
        <div class="flex flex-col">
          <span class="mb-[5px] font-bold">{{ t('profile.photoTitle') }}</span>
          <span class="text-xs opacity-40">{{ t('profile.photoHint') }}</span>
          <span class="text-xs opacity-40">{{ t('profile.photoFormats') }}</span>
        </div>
        <div class="mt-[2px] h-[72px] w-[72px]">
          <img :src="store.common.logo" />
           <!-- <img :src="store.common.logo || Image" /> -->
        </div>
      </div>
      <el-form-item prop="common.logo" label="" label-width="16" label-position="top" hide-require-asterisk>
        <el-upload class="settings-logo-uploader" round size="large" v-model="store.common.logo">
          <el-button class="btn-grey w-full cursor-pointer" round>
            <el-icon class="settings-uploader-icon"><svgo-upload color="black" /></el-icon>
            {{ t('profile.upload') }}
          </el-button>
        </el-upload>
      </el-form-item>
    </div>

    <!-- Фото заднего фона -->
    <div class="flex flex-col">
      <!-- <div class="settings-logo-infoWrapper">
        <div class="flex flex-col">
          <span class="mb-[5px] font-bold">{{ t('profile.backgroundTitle') }}</span>
          <span class="text-xs opacity-40">{{ t('profile.backgroundHint') }}</span>
          <span class="text-xs opacity-40">{{ t('profile.backgroundFormats') }}</span>
        </div>
        <div class="mt-[2px] h-[72px] w-[72px]">
          <img :src="Image" />
        </div>
      </div> -->
      <!-- <el-form-item prop="common.logo" label="" label-width="16" label-position="top" hide-require-asterisk>
        <el-upload class="settings-logo-uploader" round size="large" v-model="store.common.logo">
          <el-button class="btn-grey w-full cursor-pointer" round>
            <el-icon class="settings-uploader-icon"><svgo-upload color="black" /></el-icon>
            {{ t('profile.upload') }}
          </el-button>
        </el-upload>
      </el-form-item> -->
    </div>

    <el-button round class="btn-main" @click="putProfileInfo">
      {{ t('settings.save') }}
    </el-button>
  </el-form>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useSettingsStore } from '~/stores/settings'
import { useAuthStore } from '~/stores/auth'
import Image from '~/assets/image/image.png'
import axios from 'axios'
import { BASE_URL } from '~/env/requests.env'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import type { UploadProps } from 'element-plus'

const { locale, t } = useI18n()
const store = useSettingsStore()

const dialogImageUrl = ref('')
const dialogVisible = ref(false)

const getProfileInfo = async () => {
  const { accessToken, userId } = useAuthStore()
  const userData = await axios.get(`${BASE_URL}/user/${userId}`, {
    headers: { Authorization: `Bearer ${accessToken}` }
  })
  console.log(userData)
  store.common.name = userData.data.name
  store.common.rank = userData.data.division
  store.common.descritor = userData.data.job
  // store.common.avatar = userData.data.avatar || '' 
  // store.common.logo = userData.data.avatar
  
}

const putProfileInfo = async () => {
  const { accessToken, userId } = useAuthStore()
  const data = {
    name: store.common.name,
    division: store.common.rank,
    job: store.common.descritor,
    // avatar: store.common.avatar //
    // avatar: store.common.logo

  }

  const putProfile = await axios.put(`${BASE_URL}/user/${userId}`, data, {
    headers: { Authorization: `Bearer ${accessToken}` }
  })
  console.log("123123",putProfile)

  if (putProfile.status === 200) {
    store.common.name = putProfile.data.name
    store.common.rank = putProfile.data.division
    store.common.descritor = putProfile.data.job
    // store.common.avatar = putProfile.data.avatar // 
    // store.common.logo = putProfile.data.avatar
  }
  ElMessage.success({
    message: 'Данные сохранены',
    duration: 2000,
    showClose: true
  })
}

onMounted(() => {
  const savedLang = localStorage.getItem('user-lang')
  if (savedLang === 'en' || savedLang === 'ru' || savedLang === 'be') {
    locale.value = savedLang
  }

  getProfileInfo()
})
</script>
