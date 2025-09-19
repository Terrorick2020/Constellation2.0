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
    <el-container class="w-full profiles list-load" style="padding: 0; margin: 0; background: transparent;" v-loading="load">
      <el-main style="padding: 0; margin: 0; background: transparent;">
        <div class="item-container">
          <template v-if="filteredUsers.length > 0">
            <el-card
              v-for="o in filteredUsers"
              :key="o.username"
              class="user-card"
              shadow="always"
            >
              <div class="user-card-content">
                <el-avatar :size="48" :src="Avatar" class="border border-black/15" />
                <div class="user-info">
                  <h4 class="user-name">{{ o.id }} ВРЕМЕННО</h4>
                  <h4 class="user-name">{{ o.username }}</h4>
                  <h5 class="user-fio">{{ o.name }}</h5>
                </div>
                <NuxtLink :to="`/profiles/${o.id}`">
                  <el-button class="profile-description">
                    <span class="mr-2 text-[#ffffff]">Перейти к профилю</span>
                    <el-icon>
                      <Right class="text-[#ffffff]" />
                    </el-icon>
                  </el-button>
                </NuxtLink>
              </div>
            </el-card>
          </template>
          <template v-else>
            <div class="no-users-message">
              К сожалению, пока никто не зарегистрировался😔
            </div>
          </template>
        </div>
      </el-main>
    </el-container>
  </div>
</template>


<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import Avatar from '~/assets/image/avatar.png'
import { Right } from '@element-plus/icons-vue'
import { BASE_URL } from '~/env/requests.env'
import axios from 'axios';
import { useAuthStore } from '~/stores/auth'



interface usersAll {
  id: number;
  username: string;
  name: string;
}

const users = ref<usersAll[]>([]);
const filteredUsers = ref<usersAll[]>([]);
const searchQuery = ref('');
const load = ref(true);

const filterUsers = () => {
  const query = searchQuery.value.toLowerCase().trim();
  if (query === '') {
    filteredUsers.value = users.value;
  } else {
    filteredUsers.value = users.value.filter(user =>
      user.username.toLowerCase().includes(query) ||
      user.name.toLowerCase().includes(query)
    );
  }
};

const timeout = ref<number | undefined>();

watch(searchQuery, (newQuery) => {
  clearTimeout(timeout.value);
  timeout.value = window.setTimeout(() => {
    filterUsers();
  }, 500);
});


const getUsers = async () => {
  load.value = true;

  try {
    const { accessToken, userId } = useAuthStore();
    const response = await axios.get(`${BASE_URL}/user`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    });
    console.log("ОТВЕТ ОТ СЕРВЕРА", response);

    users.value = response.data
      .filter((usr: any) => usr.id !== userId)
      .map((usr: any) => ({
        id: usr.id,
        username: usr.username,
        name: usr.name,
      }));

    filteredUsers.value = users.value;
  } catch (error) {
    console.error('Ошибка загрузки пользователей:', error);
  } finally {
    load.value = false;
  }
};



onMounted(() => {
  
  getUsers();
  
});
</script>

<style scoped lang="scss">
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
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.user-card-content {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .user-info {
    flex-grow: 1;
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

.btn-add {
  height: 100%;
}

.is-loading {
  background: transparent !important;
}


.no-users-message{
  width: 100%;
  height: 60vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
}


</style>
