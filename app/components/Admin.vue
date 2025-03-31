<template>
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
</template>

<script setup lang="ts">
import { UploadFilled } from '@element-plus/icons-vue'
</script>

<style scoped lang="scss">
.el-icon svg {
  width: 80px !important;
  height: 80px !important;
}

.text {
  color: rgb(214, 87, 23) !important;
  font-size: 15px !important;
}
</style>