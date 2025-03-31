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
  <AuthInfo v-if="isFInpErr" text="Файл не выбран" />

</template>

<script setup lang="ts">
import { genFileId } from 'element-plus'
import { useAuthStore } from '~/stores/auth'
import { AUTH_INP_TYPE } from '~/constants/auth'
import { lenCode } from '~/env/auth.env'

import type { UploadInstance, UploadProps, UploadRawFile } from 'element-plus'

const authStore = useAuthStore()

const upload = ref<UploadInstance>()

const handleExceed: UploadProps['onExceed'] = (files) => {
  upload.value!.clearFiles()
  const file = files[0] as UploadRawFile
  file.uid = genFileId()
  upload.value!.handleStart(file)
}

const beforeUpload = (file: UploadRawFile) => {
  // Проверяем размер файла, тип и т.д.
  console.log('Получен файл:', file);

  // Возвращаем true или false, чтобы разрешить или отменить загрузку
  return true;
}

const handleFileChange = (file: UploadRawFile, fileList: UploadRawFile[]) => {
  // Выводим информацию о выбранном файле в консоль
  console.log('Выбран файл:', file)
  console.log('Список файлов:', fileList)

  // Здесь можно добавить дополнительную обработку файла
}

const isFInpErr = computed( () => authStore.fInpErr.value )
</script>
