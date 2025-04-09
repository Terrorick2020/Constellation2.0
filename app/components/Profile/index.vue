<template>
  <div class="flex flex-col w-full">
    <!-- Поле поиска -->
    <el-input
      v-model="searchQuery"
      size="large"
      placeholder="Поиск по имени или фамилии..."
      class="h-[60px] max-w-full lg:max-w-[935px]"
      @input="searchProfile"
    >
      <template #prefix>
        <SvgoSearch filled class="h-6 w-[30px]" :font-controlled="false" />
      </template>
    </el-input>

    <!-- Контейнер для карточек -->
  <el-container class="w-full profiles" style="padding: 0; margin: 0; background: transparent;" v-loading="load">
    <el-main style="padding: 0; margin: 0; background: transparent;">
        <div class="item-container">
          <el-card
            v-for="o in visibleUser"
            :key="o.username"
            class="user-card"
            shadow="always"
          >
            <div class="user-card-content">
              <el-avatar :size="48" :src="Avatar" class="border border-black/15" />
              <div class="user-info">
                <h4 class="user-name">{{ o.username }}</h4>
                <!-- <h5 class="user-fio">{{ o.fio }}</h5> -->
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
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import Avatar from '~/assets/image/avatar.png'
import { Right } from '@element-plus/icons-vue'
import { BASE_URL, POSTS_ENDPOINT, getHeaders } from '~/env/requests.env'
import axios from 'axios';
import { useAuthStore } from '~/stores/auth'

interface usersAll {
  id: number;
  username: string;
}

const users: usersAll[] = [];


// const users = [
//   { name: 'User 1', fio: 'Тараскин Илья Дмитриевич' },
//   { name: 'User 2', fio: 'Иванов Иван Иванович' },
//   { name: 'User 3', fio: 'Петров Петр Петрович' },
//   { name: 'User 4', fio: 'Смирнов Сергей Александрович' },
//   { name: 'User 5', fio: 'Кузнецов Николай Владимирович' },
//   { name: 'User 6', fio: 'Алексеев Александр Павлович' },
//   { name: 'User 7', fio: 'Дмитриев Дмитрий Викторович' },
//   { name: 'User 8', fio: 'Григорьев Георгий Игоревич' },
//   { name: 'User 9', fio: 'Смолин Алексей Николаевич' },
//   { name: 'User 10', fio: 'Глушков Сергей Павлович' },
//   { name: 'User 11', fio: 'Николаев Владимир Игоревич' },
//   { name: 'User 12', fio: 'Королев Алексей Владимирович' },
//   { name: 'User 13', fio: 'Федоров Сергей Андреевич' },
//   { name: 'User 14', fio: 'Морозова Ирина Юрьевна' },
//   { name: 'User 15', fio: 'Крылов Алексей Иванович' },
//   { name: 'User 16', fio: 'Васильев Дмитрий Олегович' },
//   { name: 'User 17', fio: 'Лебедев Алексей Петрович' },
//   { name: 'User 18', fio: 'Тимофеев Сергей Павлович' },
//   { name: 'User 19', fio: 'Семенов Иван Павлович' },
//   { name: 'User 20', fio: 'Романова Екатерина Александровна' },
// ];

const filteredUsers = ref(users);

const searchQuery = ref('');
const visibleUser = ref(users.slice(0, 5))
const load = ref(true)


const filterUsers = () => {
  filteredUsers.value = users.filter(user =>
      user.username.toLowerCase().includes(searchQuery.value.toLowerCase().trim())
    // user.username.toLowerCase().includes(searchQuery.value.toLowerCase().trim()) || 
    // user.fio.toLowerCase().includes(searchQuery.value.toLowerCase().trim())
  );
  visibleUser.value = filteredUsers.value.slice(0, 5);
};

const loadMoreDocs = () => {
  const currentLength = visibleUser.value.length
  if (currentLength < filteredUsers.value.length) {
    const newDocs = filteredUsers.value.slice(currentLength, currentLength + 5)
    visibleUser.value.push(...newDocs)
  }
}

const onScroll = () => {  
  const scrollPosition = window.scrollY + window.innerHeight
  let bottomPosition = document.documentElement.scrollHeight

  const foot = document.getElementById('app-footer')
  if (foot) bottomPosition -= foot.offsetHeight;

  if (scrollPosition >= bottomPosition) {
    loadMoreDocs()
  }
}

let timeout: ReturnType<typeof setTimeout>;

// Watcher для searchQuery с задержкой
watch(searchQuery, (newQuery) => {
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    filterUsers();
  }, 500);
});

const getUsers = async () => {
  load.value = true

  const usersListResponse = await axios.get(`${BASE_URL}/user`,{
    headers: {
      'Content-Type': 'application/json', 
    }

  });

  console.log(usersListResponse.data[0].username)
  console.log(usersListResponse)

  usersListResponse.data.forEach((usr: any) => {
    users.push({
      id: usr.id,   
      username: usr.username,  
    });
  });
  visibleUser.value = users.slice(0, 5);
  // load.value = false
  setTimeout(() => {
    load.value = false;  // Скрываем лоадер после задержки
  }, 2000);

}

const searchProfile = () => {
}

onMounted(() => {
  getUsers()
  window.addEventListener('scroll', onScroll)
})

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
</style>
