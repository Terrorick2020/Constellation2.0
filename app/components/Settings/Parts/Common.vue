<template>
  <el-form class="flex min-h-[600px] w-full flex-col">
    <span class="settings-title">Изменить данные профиля</span>
    <span class="pb-[10px] font-bold">ФИО*</span>
    <el-form-item prop="common.name" label-width="16" label-position="top" hide-require-asterisk>
        <el-input size="large" v-model="store.common.name" />
    </el-form-item>

    <!-- <span class="font-bold">Пароль*</span>
    <el-input size="large" v-model="store.common.password"  /> -->

    <span class="font-bold">Подразделение*</span>
    
    <el-input size="large" v-model="store.common.rank"  />
   
    <span class="mt-[18px] font-bold">Должность*</span>
    <el-input size="large" v-model="store.common.descritor"  />

    

    <div class="mt-[18px] flex flex-col">
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


    
    <el-button round class="btn-main" @click="putProfileInfo">Сохранить</el-button>
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

import axios from 'axios'
import { onMounted } from 'vue'
import { BASE_URL } from '~/env/requests.env'
import {useAuthStore} from "~/stores/auth"


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



// const getUserInfo = async () => {

//   const { accessToken, userId } = useAuthStore()
//   const getUser = await axios.get(`${BASE_URL}/user/profile`, {
//     headers: {
//       "Authorization": `Bearer ${accessToken}`
//     }
//   })

//   console.log(getUser)
  
  
// }


const getProfileInfo = async () => {
  const { accessToken, userId } = useAuthStore()
  const userData = await axios.get(`${BASE_URL}/user/${userId}`, {
    headers: {
      "Authorization": `Bearer ${accessToken}`
    }
    
  })

  store.common.name  = userData.data.name
  store.common.rank  = userData.data.division
  store.common.descritor  = userData.data.job
  // console.log("ГОВНО", userData)


}

const putProfileInfo = async () => {
  const { accessToken, userId } = useAuthStore()
  const data = {
    name: store.common.name,
    division: store.common.rank,
    job: store.common.descritor,
  }

  
  const putProfile = await axios.put(`${BASE_URL}/user/${userId}`,data,{

    headers: {
      "Authorization": `Bearer ${accessToken}`
    }
  })

  if (putProfile.status === 200) {
    store.common.name  = putProfile.data.name
    store.common.rank  = putProfile.data.division
    store.common.descritor  = putProfile.data.job
  }

  console.log(putProfile)

}





onMounted(() => {
  getProfileInfo()
})

</script>
