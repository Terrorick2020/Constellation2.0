<template>
    <el-button type="primary" style="margin-left: 16px" @click="drawer = true">
      open
    </el-button>
  
    <el-drawer v-model="drawer" title="I'm outer Drawer" size="50%">
      <div>
        <el-button @click="innerDrawer = true">Click me!</el-button>
        <el-drawer
          v-model="innerDrawer"
          title="I'm inner Drawer"
          :append-to-body="true"
          :before-close="handleClose"
        >
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
        </el-drawer>
      </div>
    </el-drawer>
  </template>
  
  <script lang="ts" setup>
  import { ref } from 'vue'
  import { ElMessageBox } from 'element-plus'
  
  const drawer = ref(false)
  const innerDrawer = ref(false)
  
  const handleClose = (done: () => void) => {
    ElMessageBox.confirm('You still have unsaved data, proceed?')
      .then(() => {
        done()
      })
      .catch(() => {
        // catch error
      })
  }
  </script>