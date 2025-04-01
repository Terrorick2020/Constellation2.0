<template>
  <div class="Main-block">
    <div class="button-container">
      <NuxtLink :to="`/docs`" class="back">
        <el-button type="warning">Назад</el-button>
      </NuxtLink>

      <el-button type="info" class="down">
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
    <el-button type="success" class="subscribe">Подписать</el-button>
  </div>
</template>

<script lang="ts" setup>
import { ArrowDownBold } from '@element-plus/icons-vue'
import pdfFile from '~/assets/image/1.pdf'
</script>

<style scoped lang="scss">
.Main-block {
  position: relative;
  height: 100vh; /* Высота 100% от экрана */
  display: flex;
  flex-direction: column;
  justify-content: center; /* Центрируем элементы по вертикали */
  align-items: center; /* Центрируем элементы по горизонтали */
}

.button-container {
  position: absolute;
  top: 25px; /* Располагаем кнопки на верхней части экрана */
  left: 25px; /* Добавляем отступ слева */
  right: 25px; /* Добавляем отступ справа */
  display: flex;
  justify-content: space-between; /* Распределяем кнопки по краям */
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
  justify-content: center; /* Центрируем PDF по горизонтали */
  margin-top: 100px; /* Отступ сверху, чтобы кнопки не перекрывались с документом */
  width: 100%;
  height: 80vh; /* Ограничиваем высоту для PDF */
  overflow: hidden; /* Чтобы избежать прокрутки */
}
</style>
