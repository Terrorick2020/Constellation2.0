<template>
  <div class="flex flex-col w-full">
      <div class="card-header">
        <span>Список всех пользователей</span>
      </div>

      <el-input
        v-model="searchQuery"
        size="large"
        placeholder="Поиск по названию и др...."
        class="h-[60px] max-w-full lg:max-w-[935px]"
      >
      <template #prefix>
        <SvgoSearch filled class="h-6 w-[30px]" :font-controlled="false" />
      </template>
    </el-input>
      

    <div class="item-container">
      <p v-for="o in filteredUsers" :key="o" class="text item">{{ '' + o }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';

const searchQuery = ref('');

const users = ['User 1', 'User 2', 'User 3', 'User 4', 'User 5', 'User 7', 'User 8', 'User 9', 'User 10',
              'User 11', 'User 12', 'User 13', 'User 14', 'User 15', 'User 17', 'User 18', 'User 19', 'User 20'];

const filteredUsers = ref<string[]>(users);

const filterUsers = () => {
  filteredUsers.value = users.filter(user =>
    user.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
};

let timeout: ReturnType<typeof setTimeout>;

// Watcher для searchQuery 
watch(searchQuery, (newQuery) => {
  clearTimeout(timeout); 
  timeout = setTimeout(() => {
    filterUsers();
  }, 500); 
});
</script>

<style scoped lang="scss">
// rename to prevent conflicts
.search {
  margin-top: 7px;
  color: #555;
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
