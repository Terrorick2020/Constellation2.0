<template>
    <el-drawer @close="handleClose" v-model="props.drawer" title="Панель загрузки новых приказов (приказаний)" size="50%">
      <div>
        <el-upload
            class="upload-demo w-full"
            drag
            multiple
            accept=".pdf"
            :file-list="fileList"
            :on-change="handleFileChange"
            :on-remove="handleFileRemove"
            :auto-upload="false"
        >
            <el-icon class="el-icon--upload"><upload-filled /></el-icon>
            <div class="el-upload__text">
                Переместите файл или <em class="text">нажмите на область</em>
            </div>
            <template #tip>
                <div class="el-upload__tip">
                    pdf файлы с размером не более 1mb
                </div>
            </template>
        </el-upload>
      </div>
      <el-button class="w-full mt-5"  @click="loadDocs">Подать документы</el-button>
    </el-drawer>
  </template>
  
<script lang="ts" setup>
import { ElMessageBox } from 'element-plus'
import { UploadFilled } from '@element-plus/icons-vue'
import axios from 'axios'
import { BASE_URL, getHeaders } from '~/env/requests.env'
import { useAuthStore } from '~/stores/auth'




const props = defineProps<{
    drawer: boolean
    setDrawer: (value: boolean) => void
}>()

const fileList = ref<File[]>([]);

const handleFileChange = (_uploadFile: UploadFile, fileListParam: UploadFile[]) => {
  fileList.value = fileListParam;
};

const handleFileRemove = (_file: UploadFile, fileListParam: UploadFile[]) => {
  fileList.value = fileListParam;
};


const loadDocs = async () => {

  if (!fileList.value.length) return;

  const filesList: FormData[] = []

  for (let file: UploadFile of fileList.value) {
      const formData = new FormData()
      formData.append('title', file.raw.name)
      formData.append('file', file.raw)

      console.log( file.raw.name )
      console.log( file.raw )

      console.info(formData)

      const { accessToken } = useAuthStore()

      await axios.post(`${BASE_URL}/admin/post`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', 
          'Authorization': `Bearer ${accessToken}`
        },
      })

      filesList.push(formData)
  }

  props.setDrawer( false )
}


const handleClose = () => {
    props.setDrawer( false )
}
</script>