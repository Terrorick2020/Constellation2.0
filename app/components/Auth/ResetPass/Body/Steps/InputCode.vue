<template>

  <el-upload
    ref="upload"
    class="upload-cert"
    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
    :limit="1"
    :on-exceed="handleExceed"
    :auto-upload="false"
  >
    <template #trigger>
      <el-button type="primary">Загрузить цифровую подпись...</el-button>
    </template>
  </el-upload>

</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'
import { AUTH_INP_TYPE } from '~/constants/auth'
import { lenCode } from '~/env/auth.env'


const props = defineProps<{
  basePath: string
}>()

const authStore = useAuthStore()

const code = ref('')

provide( 'code', code )

watch(() => code.value, (newValue) => {
  authStore.fInpErr.value = newValue.length < lenCode

  authStore.code = authStore.fInpErr.value ? '' : newValue
})

const isFInpErr = computed( () => authStore.fInpErr.value )

import { genFileId } from 'element-plus'
import type { UploadInstance, UploadProps, UploadRawFile } from 'element-plus'

const upload = ref<UploadInstance>()

const handleExceed: UploadProps['onExceed'] = (files) => {
  upload.value!.clearFiles()
  const file = files[0] as UploadRawFile
  file.uid = genFileId()
  upload.value!.handleStart(file)
}
</script>