<template>
    <div class="container">
      <!-- Название документа -->
      <h1>{{ documentName }}</h1>
      
      <!-- Отображение PDF -->
      <embed
        src="/exmple.pdf"
        type="application/pdf"
        width="100%"
        height="600px"
      />
      
      <div class="button-container">
        <el-button type="success">Подписать</el-button>
        <el-button type="info">К документам</el-button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { useDocumentStore } from '~/stores/documentStore'
  
  const documentStore = useDocumentStore()
  
  // Получаем название документа из глобального состояния
  const documentName = documentStore.documentName
  </script>
  
  <style scoped>
  .container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    padding: 20px;
  }
  
  h1 {
    text-align: center;
    color: #4a0fb1; /* Установите красивый цвет */
    margin-bottom: 20px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 36px; /* Увеличенный размер шрифта */
    font-weight: 700; /* Жирный текст */
    letter-spacing: 2px; /* Немного растягиваем буквы */
    background: linear-gradient(45deg, #4a0fb1, #ff7b7b); /* Градиентный фон */
    -webkit-background-clip: text; /* Обрезка фона для текста */
    color: transparent; /* Делает текст прозрачным, чтобы виден был только градиент */
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2); /* Тень для текста */
    padding: 5px 0; /* Добавим немного отступов */
  }
  
  .button-container {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }
  </style>
  