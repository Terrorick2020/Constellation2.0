<template>
  <div class="flex w-full flex-col gap-[1px]">
    <Profiles />

    <div class="flex flex-col w-full">
      <div class="card-header">
        <span>Список всех пользователей</span>
      </div>

      <el-input
        v-model="searchQuery"
        placeholder="Поиск пользователей..."
        prefix-icon="el-icon-search"
        class="search-input"
      />

      <div class="item-container">
        <p v-for="o in filteredUsers" :key="o" class="text item">{{ '' + o }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const searchQuery = ref(''); // Строка поиска

const users = ['User 1', 'User 2', 'User 3', 'User 4', 'User 5', 'User 7', 'User 8', 'User 9', 'User 10',
              'User 11', 'User 12', 'User 13', 'User 14', 'User 15', 'User 17', 'User 18', 'User 19', 'User 20',

];

const filteredUsers = computed(() => {
  return users.filter(user => user.toLowerCase().includes(searchQuery.value.toLowerCase()));
});
</script>

<style scoped>
  .flex {
    margin-top: 35px;  
    display: flex;
    justify-content: center;
    height: 100%;  
  }

  .card-header {
    display: flex;
    justify-content: center;
    font-weight: bold;
    font-size: 20px;
  }

  .item {
    font-size: 17px;
    color: #555;
    margin-left: 10px;
  }

  .item-container {
    max-height: 300px; 
    overflow-y: auto;  
    margin-top: 10px; 
  }

  .search-input {
    margin-bottom: 10px; 
    width: 100%; 
    max-width: 1000px;  
  }
</style>
