<template>
    <el-drawer @close="handleClose" v-model="props.drawer" title="Панель загрузки новых приказов (приказаний)" size="50%">
      <div>
        <el-upload
            class="upload-demo w-full"
            drag
            multiple
            accept=".pdf"
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

const props = defineProps<{
    drawer: boolean
    setDrawer: (value: boolean) => void
}>()

const loadDocs = () => {
    console.log( 'загрузить докуфваиваив' )
    props.setDrawer( false )
}

const handleClose = () => {
    props.setDrawer( false )
}
</script>