<template>
  <div class="flex flex-col w-full">
    <!-- Поле поиска -->
    <el-input
      v-model="searchQuery"
      size="large"
      placeholder="Поиск по имени или фамилии..."
      class="h-[60px] max-w-full lg:max-w-[935px]"
    >
      <template #prefix>
        <SvgoSearch filled class="h-6 w-[30px]" :font-controlled="false" />
      </template>
    </el-input>

    <!-- Контейнер для карточек -->
    <div class="item-container">
      <el-card
        v-for="o in filteredUsers"
        :key="o.name"
        class="user-card"
        shadow="always"
      >
        <div class="user-card-content">
          <el-avatar :size="48" :src="Avatar" class="border border-black/15" />
          <div class="user-info">
            <h4 class="user-name">{{ o.name }}</h4>
            <h5 class="user-fio">{{ o.fio }}</h5>
          </div>
          <NuxtLink :to="`/profiles/${o.name}`">
            <el-button class="profile-description">
              <span class="mr-2 text-[#ffffff]">Перейти к профилю</span>
              <el-icon>
                <Right class="text-[#ffffff]" />
              </el-icon>
            </el-button>
          </NuxtLink>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import Avatar from '~/assets/image/avatar.png'
import { Right } from '@element-plus/icons-vue'

// Массив пользователей
const users = [
  { name: 'User 1', fio: 'Тараскин Илья Дмитриевич' },
  { name: 'User 2', fio: 'Иванов Иван Иванович' },
  { name: 'User 3', fio: 'Петров Петр Петрович' },
  { name: 'User 4', fio: 'Смирнов Сергей Александрович' },
  { name: 'User 5', fio: 'Кузнецов Николай Владимирович' },
  { name: 'User 6', fio: 'Алексеев Александр Павлович' },
  { name: 'User 7', fio: 'Дмитриев Дмитрий Викторович' },
  { name: 'User 8', fio: 'Григорьев Георгий Игоревич' },
  { name: 'User 9', fio: 'Смолин Алексей Николаевич' },
  { name: 'User 10', fio: 'Глушков Сергей Павлович' },
];

const filteredUsers = ref(users);

const searchQuery = ref('');

// Функция для фильтрации пользователей по имени или фамилии
const filterUsers = () => {
  filteredUsers.value = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.value.toLowerCase().trim()) || 
    user.fio.toLowerCase().includes(searchQuery.value.toLowerCase().trim())
  );
};

let timeout: ReturnType<typeof setTimeout>;

// Watcher для searchQuery с задержкой 500 мс
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


.item-container {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.user-card {
  padding: 5px;
  background-color: #f7f7f7;
  border-radius: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.user-card-content {
  display: flex;
  justify-content: space-between; /* Ensure space between avatar, user info and the button */
  align-items: center;
  .user-info {
    flex-grow: 1; /* Allows the user info section to take up available space */
    display: flex;
    flex-direction: column;
    margin-left: 35px;
    .user-name {
      font-size: 18px;
      color: #333;
    }

    .user-fio {
      font-size: 15px;
      color: #333;
    }
  }
  .profile-description {
    background-color: #FF6C46;
    border-radius: 7px;
    font-size: 15px;
    color: #333;
  }
}


</style>
