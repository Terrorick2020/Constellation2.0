<template>

  <el-upload
    ref="upload"
    class="upload-cert"
    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
    :limit="1"
    :on-exceed="handleExceed"
    :auto-upload="false"
    :on-change="handleFileChange"
    accept=".pem, .key, .crt"
  >
    <template #trigger>
      <el-button type="primary">Загрузить цифровую подпись...</el-button>
    </template>
  </el-upload>
  <AuthInfo v-if="isFInpErr" :text="fInpErrMsg" />

</template>

<script setup lang="ts">
import { genFileId } from 'element-plus'
import { useAuthStore } from '~/stores/auth'
import { AUTH_INP_TYPE } from '~/constants/auth'
import { lenCode } from '~/env/auth.env'

import type { UploadInstance, UploadProps, UploadRawFile } from 'element-plus'


const loadErr = [
  'Ключ не загружен',
  'Ошибка загрузки ключа',
]

const authStore = useAuthStore()

const upload = ref<UploadInstance>()

const handleExceed: UploadProps['onExceed'] = (files) => {
  authStore.fInpErr.value = false
  authStore.fInpErr.index = null
  upload.value!.clearFiles()
  const file = files[0] as UploadRawFile
  file.uid = genFileId()
  upload.value!.handleStart(file)
}

const handleFileChange = (file: UploadRawFile, fileList: UploadRawFile[]) => {
  if (!file || !file.raw) {
    authStore.fInpErr.value = true
    authStore.fInpErr.index = 1
    return
  }

  const reader = new FileReader()
  reader.readAsDataURL(file.raw)

  reader.onload = () => {
    const base64Data = reader.result as string
    authStore.key = base64Data
  }

  reader.onerror = (error) => {
    authStore.fInpErr.value = true
    authStore.fInpErr.index = 1
  }
}

const isFInpErr = computed( () => authStore.fInpErr.value )
const fInpErrMsg = computed( () => loadErr[ authStore.fInpErr.index ] )
</script>
