<template>
  <div class="Main-block">
    <div class="w-full flex justify-between p-5">
      <NuxtLink :to="`/docs`" class="back">
        <el-button type="warning">Назад</el-button>
      </NuxtLink>

      <el-button type="info" class="down" >
        <div class="flex flex-col items-center">
          <el-icon>
            <ArrowDownBold />
          </el-icon>
        </div>
      </el-button>
      
    </div>
    
  
    <!-- Центрируем PDF -->
    <div class="pdf-container">
        <embed
        :src="pdfFile"
        type="application/pdf"
        width="90%"
        height="90%"
        />
    </div>

    <div class="w-full flex justify-start p-5">
      <el-upload
        v-if="!isDelivered"
        ref="upload"
        class="upload-cert"
        :limit="1"
        :on-exceed="handleExceed"
        :auto-upload="false"
        :on-change="handleFileChange"
        :on-remove="handleFileRemove"
        accept=".pem, .key, .crt"
        :show-file-list="false"
      >
        <template #trigger>
          <el-button type="success">Подписать</el-button>
        </template>
      </el-upload>
      <p v-else>Документ подписан</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ArrowDownBold } from '@element-plus/icons-vue'
import { BASE_URL, getHeaders } from '~/env/requests.env'
import axios from 'axios';
import { useRoute } from 'vue-router';
import { ref, computed, onMounted, watch } from 'vue'
import { useAuthStore } from '~/stores/auth'
import { useSignStore } from '~/stores/signStore'




const props = defineProps<{
  docId: string;  // Тип для docId
}>();

const upload = ref<UploadInstance>()
const keyfile = ref<File>()
const pdfFile = ref('');
const isDelivered = ref(false)

const signStore = useSignStore()

//функция для отображения документа
const getDoc = async () => {
  const {accessToken} = useAuthStore()
  const getCurrentDoc = await axios.get(`${BASE_URL}/post/${props.docId}`, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${accessToken}`
      }
    });

  isDelivered.value = getCurrentDoc.data.data.sign

  console.log("Запрос сделан", getCurrentDoc.data.data)
  const base64Data = getCurrentDoc.data.data.content;
  // console.log("Запрос на base64", base64Data);
  pdfFile.value = `data:application/pdf;base64,${base64Data}`;
  // console.log("PDF файл готов", pdfFile.value);
  signStore.setDocumentStatus(props.docId, getCurrentDoc.data.data.sign ? 'success' : 'failed')


};


//функция для подписи документов
// какой id использовать userid или просто id

const SubscribeDoc = async () => {
  console.log("ФУНКЦИЯИ ")
  if (!keyfile.value) return;
  console.log("ФУНКЦИЯИ222 ")

  const formData = new FormData();
  formData.append('file', keyfile.value);

  const { accessToken } = useAuthStore();
  console.log("ФУНКЦИЯИ33 ")

  const subscribeCurrentDoc = await axios.post(`${BASE_URL}/sign/${props.docId}`, formData, {
    
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${accessToken}`
    },

  });
  
  if (subscribeCurrentDoc.data.result === 'success') {
    isDelivered.value = true
    signStore.setDocumentStatus(props.docId, 'success')
  } else {
    signStore.setDocumentStatus(props.docId, 'failed')
  }
  console.log("Подпись успешно создана:", subscribeCurrentDoc);
  console.log("RESULT", subscribeCurrentDoc.data.result);

  
};
  



const handleExceed: UploadProps['onExceed'] = (files) => {
  upload.value!.clearFiles()
  const file = files[0] as UploadRawFile
  file.uid = genFileId()
  upload.value!.handleStart(file)
}

const handleFileChange = (file: UploadRawFile, fileList: UploadRawFile[]) => {
  if (!file || !file.raw) {
    
    return
  }

  
  
  const reader = new FileReader()
  reader.readAsDataURL(file.raw)

  reader.onload = () => {
    console.log("rfkfkfkfkf")
    keyfile.value = file.raw

    SubscribeDoc()
  }

  reader.onerror = (error) => {
    console.log(error)
  }


}

const handleFileRemove: UploadProps['onRemove'] = (file, fileList) => {  
  authStore.fInpErr.value = true
  authStore.fInpErr.index = 0
  authStore.key = ''
}




onMounted(() => {
  getDoc()
})

</script>

<style scoped lang="scss">
.Main-block {
  position: relative;
  height: 100vh; 
  display: flex;
  flex-direction: column;
  justify-content: center; 
  align-items: center; 
}

.button-container {
  position: absolute;
  top: 25px; 
  left: 25px; 
  right: 25px; 
  display: flex;
  justify-content: space-between; 
  align-items: center;
}

.subscribe {
  width: 150px;
  height: 40px;
  margin-bottom: 40px;
  margin-left: -915px;
  // background: #67c23a;
}

.down {
  margin-top: 0;
}

.back {
  margin-right: auto;
}

.pdf-container {
  position: relative;
  display: flex;
  justify-content: center; 
  margin-top: 30px; 
  width: 100%;
  height: 90vh;
  overflow: hidden;
}
</style>
