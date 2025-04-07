<template>
  <div class="Main-block">
    <div class="button-container">
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
        height="95%"
        />
    </div>
    <el-button type="success" class="subscribe" @click="SubscribeDoc">Подписать</el-button>
  </div>
</template>

<script lang="ts" setup>
import { ArrowDownBold } from '@element-plus/icons-vue'
import { BASE_URL, getHeaders } from '~/env/requests.env'
import axios from 'axios';
import { useRoute } from 'vue-router';
import { ref, computed, onMounted, watch } from 'vue'
import { useAuthStore } from '~/stores/auth'


const props = defineProps<{
  docId: string;  // Тип для docId
}>();

const pdfFile = ref('');
//функция для отображения документа
const getDoc = async () => {
  const getCurrentDoc = await axios.get(`${BASE_URL}/post/${props.docId}`, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

  // console.log("Запрос сделан", getCurrentDoc.data.data.content)
  const base64Data = getCurrentDoc.data.data.content;
  // console.log("Запрос на base64", base64Data);
  pdfFile.value = `data:application/pdf;base64,${base64Data}`;
  // console.log("PDF файл готов", pdfFile.value);

};


//функция для подписи документов
// какой id использовать userid или просто id
const SubscribeDoc = async () => {
  const formData = new FormData();
  formData.append('postId', props.docId);
  const pdfFile_data =  pdfFile.value.split('data:application/pdf;base64,')[1];
  formData.append('file', pdfFile_data);
  // const { accessToken } = useAuthStore()
  const subscribeCurrentDoc = await axios.post(`${BASE_URL}/signature/create`,formData,{
    
    headers: {
      'Content-Type': 'multipart/form-data',

    },

  });
  console.log("Подпись успешно создана:", subscribeCurrentDoc);
};
  

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
  margin-top: 100px; 
  width: 100%;
  height: 80vh; 
  overflow: hidden;
}
</style>
