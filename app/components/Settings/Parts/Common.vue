<template>
  <el-form class="flex min-h-[600px] w-full flex-col">
    <span class="settings-title">Изменить данные профиля</span>
    <span class="pb-[10px] font-bold">ФИО*</span>
    <el-form-item prop="common.name" label-width="16" label-position="top" hide-require-asterisk>
        <el-input size="large" v-model="store.common.name" />
    </el-form-item>

    <span class="font-bold">Пароль*</span>
    <el-input size="large" v-model="store.common.password"  />

    <span class="font-bold">Подразделение*</span>
    
    <el-input size="large" v-model="store.common.rank"  />
   
    <span class="font-bold">Должность*</span>
    <el-input size="large" v-model="store.common.rank"  />

    

    <div class="flex flex-col">
      <div class="settings-logo-infoWrapper">
        <div class="flex flex-col">
          <span class="mb-[5px] font-bold">Фото профиля</span>
          <span class="text-xs opacity-40">Рекомендуемый размер 512х512px.</span>
          <span class="text-xs opacity-40">Доступные форматы: png, jpeg.</span>
        </div>
        <div class="mt-[2px] h-[72px] w-[72px]">
          <img :src="store.common.logo" />
        </div>
      </div>
      <el-form-item
        prop="common.logo"
        label=""
        label-width="16"
        label-position="top"
        hide-require-asterisk
      >
        <el-upload class="settings-logo-uploader" round size="large" v-model="store.common.logo">
          <el-button class="btn-grey w-full cursor-pointer" round>
            <el-icon class="settings-uploader-icon"><svgo-upload color="black" /></el-icon>
            Загрузить
          </el-button>
        </el-upload>
      </el-form-item>
    </div>
    
    <div class="flex flex-col">
      <div class="settings-logo-infoWrapper">
        <div class="flex flex-col">
          <span class="mb-[5px] font-bold">Фото заднего фона</span>
          <span class="text-xs opacity-40">Рекомендуемый размер 812х812px.</span>
          <span class="text-xs opacity-40">Доступные форматы: png, jpeg.</span>
        </div>
        <div class="mt-[2px] h-[72px] w-[72px]">
          <img :src="Image" />
        </div>
      </div>
      <el-form-item
        prop="common.logo"
        label=""
        label-width="16"
        label-position="top"
        hide-require-asterisk
      >
        <el-upload class="settings-logo-uploader" round size="large" v-model="store.common.logo">
          <el-button class="btn-grey w-full cursor-pointer" round>
            <el-icon class="settings-uploader-icon"><svgo-upload color="black" /></el-icon>
            Загрузить
          </el-button>
        </el-upload>
      </el-form-item>
    </div>


    
    <el-button round class="btn-main">Сохранить</el-button>
  </el-form>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import type { UploadProps } from 'element-plus'
import { useSettingsStore } from '~/stores/settings'
import Image from '~/assets/image/image.png'
import {
  MAX_DESCRIPTOR_WIDTH,
  MAX_DESCRIPTION_WIDTH,
  URL_PREFIX,
  MAX_MEDIA_COUNT
} from '~/constants/settings'

const store = useSettingsStore()
const dialogImageUrl = ref('')
const dialogVisible = ref(false)

const urlFormatter = (value: string) =>
  URL_PREFIX.includes(value) ? URL_PREFIX : `${URL_PREFIX}${urlParser(value)}`
const urlParser = (value: string) => value.replace(/(collaba\.pro\/u\/)\s?/g, '')

const descriptorWidth = ref(MAX_DESCRIPTOR_WIDTH - store.common.descritor.length)
const descriptionWidth = ref(MAX_DESCRIPTION_WIDTH - store.common.description.length)

const handleMediaSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
  store.common.media = [
    ...store.common.media,
    {
      name: uploadFile.name,
      url: URL.createObjectURL(uploadFile.raw!)
    }
  ]
}

const beforeMediaUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type !== 'image/jpeg') {
    ElMessage.error('Avatar picture must be JPG format!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!')
    return false
  }
  return true
}

const handleMediaRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
  store.common.media = uploadFiles
}

const handleMediaPreview: UploadProps['onPreview'] = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url!
  dialogVisible.value = true
}
</script>
