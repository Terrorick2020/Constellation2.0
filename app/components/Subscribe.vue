<template>
    <div class="button-container">
      <el-button type="warning" class="back">Назад</el-button>
      <el-button type="info" class="down">
        <div class="flex flex-col items-center">
            <el-icon>
                <ArrowDownBold />
            </el-icon>
        </div>
        
        

      </el-button>
      <el-button type="success" class="subscribe">Подписать</el-button>
    </div>
    
</template>
  
<script lang="ts" setup>

import { ArrowDownBold } from '@element-plus/icons-vue'
import pdfFile from '~/assets/image/1.pdf'
</script>
  
<style scoped lang="scss">
.button-container {
    display: flex;
    flex-direction: column; 
    height: 80vh; 
    padding: 25px;
    justify-content: space-between;
}
  
.subscribe {
    margin-top: 30px;
    width: 150px; 
    height: 40px; 

}
  
.down {
    margin-left: auto; 
    margin-top: -480px; 
}
  
.back {
    margin-right: auto; 
    margin-top: 10px; 
}
</style>
  