<!-- <template>
  <section class="relative w-full rounded-3xl border border-transparent font-medium">
    <div class="absolute left-0 right-0 top-0 z-[1] w-full">
      <img
        v-if="profileInfo.previewImage"
        :src="profileInfo.previewImage"
        class="h-[199px] w-full object-cover object-center lg:h-full lg:rounded-xl"
        alt="fon-img"
      />
      <div
        v-else
        class="bg-fon flex h-[199px] w-full items-center justify-center rounded-xl bg-gray-300"
        :style="`background-image: url(${Image});`"
      ></div>
    </div>

    <div
      class="block-wrapper profile-header-container relative z-[2] mt-[199px] gap-y-5 !rounded-t-none lg:mt-[155px] lg:rounded-[20px]"
    >
      <div class="relative flex flex-col items-center gap-5 lg:flex-row lg:items-stretch">
        <div class="w-[130px] bg-white p-[2px]">
          <el-avatar :size="130" :src="Avatar" class="absolute bottom-14 lg:bottom-0" />
        </div>
        <div class="flex flex-col items-center lg:items-stretch">
          <span class="text-2xl font-extrabold">{{ profileInfo.name }}</span>
          <span class="text-sm">{{ profileInfo.organization }}</span>
        </div>
      </div>

      <div class="item2 flex justify-end">
        <NuxtLink :to="`/chats/`" class="mr-3">
          <el-button round size="large" class="btn-main long fill-none !px-[134px] !text-[10xp]">
            <template #icon>
              <SvgoMessage filled />
            </template>
            Сообщение
          </el-button>
        </NuxtLink>
        <el-button
          round
          size="large"
          class="btn-main long fill-none !px-[134px] !text-[10xp]"
          :loading="creatingChat"
          @click="createChat"
        >
          <template #icon>
            <SvgoMessage filled />
          </template>
          Сообщение
        </el-button>

        <UIPopoverMenu :id="route.params.profile" :list="LIST_OPTIONS" @select="onSelect">
          <template #reference>
            <el-button circle :icon="'svgo-more'" class="btn-empty"></el-button>
          </template>
        </UIPopoverMenu>
      </div>
      <h2 class="custom-h2"><big class="text-700">Пользователь:</big> {{ persone.name }}</h2>
      <h1 class="custom-h1"><big class="text-700">ФИО:</big> {{ persone.fio }}</h1>
    </div>
  </section>
</template>

<script setup lang="ts">
import { DEFAULT_LOGO } from '~/constants/profile'
import { Picture as IconPicture } from '@element-plus/icons-vue'
import { useProfileStore } from '~/stores/profile'
import Image from '~/assets/image/image.png'
import Avatar from '~/assets/image/avatar.png'
import type { TPopoverItemProps } from '~/types/UI/popover'
import { onMounted, reactive } from 'vue'
import axios from 'axios'
import { useRoute } from 'vue-router'
import { BASE_URL, getHeaders } from '~/env/requests.env'
import { useAuthStore } from '~/stores/auth'
import { useChatStore } from '~/stores/createChat'

const chatStore = useChatStore() 
const { profileInfo } = useProfileStore()

const LIST_OPTIONS: TPopoverItemProps[] = [{ key: 'complain-user', label: 'Пожаловаться' }]

const props = defineProps<{
  username: string
}>()

const persone = reactive({
  name: 'Загрузка...',
  fio: 'Загрузка...'
})

const route = useRoute()
const getProfile = async () => {
  const id = route.params.profile
  const { accessToken } = useAuthStore()
  const getCurrentUser = await axios.get(`${BASE_URL}/user/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    }
  })
  console.log('CurrentUSERname', getCurrentUser.data.username)

  const response = {
    data: {
      name: getCurrentUser.data.username,
      fio: getCurrentUser.data.name
    }
  }

  persone.name = response.data.name
  persone.fio = response.data.fio
}

const authStore = useAuthStore()

if (authStore.isAdmin) {
  LIST_OPTIONS.push(
    { key: 'block-user', label: 'Заблокировать' },
    { key: 'delete-user', label: 'Удалить' }
  )
}

onMounted(() => {
  getProfile()
})

const onSelect = (option: (typeof LIST_OPTIONS)[0]) => {
  console.log('option', option)
}
</script>

<style scoped>
.image_logo {
  width: 1040px;
  height: 195px;
}
.custom-h2 {
  font-size: 15px;
  margin-left: 20px;
}

.custom-h1 {
  font-size: 15px;
  margin-left: 20px;
}

.bg-fon {
  background-repeat: no-repeat;
  background-size: contain;
  background-position: top;
}
</style> -->




<template>
  <section class="relative w-full rounded-3xl border border-transparent font-medium">
    <div class="absolute left-0 right-0 top-0 z-[1] w-full">
      <img
        v-if="profileInfo.previewImage"
        :src="profileInfo.previewImage"
        class="h-[199px] w-full object-cover object-center lg:h-full lg:rounded-xl"
        alt="fon-img"
      />
      <div
        v-else
        class="bg-fon h-[199px] w-full bg-gray-300 flex justify-center items-center rounded-xl"
        :style="`background-image: url(${Image});`"
      ></div>
    </div>

    <div
      class="block-wrapper profile-header-container relative z-[2] mt-[199px] gap-y-5 !rounded-t-none lg:mt-[155px] lg:rounded-[20px]"
    >
      <div class="relative flex flex-col items-center gap-5 lg:flex-row lg:items-stretch">
        <div class="w-[130px] bg-white p-[2px]">
          <el-avatar
            :size="130"
            :src="Avatar"
            class="absolute bottom-14 lg:bottom-0"
          />
        </div>
        <div class="flex flex-col items-center lg:items-stretch">
          <span class="text-2xl font-extrabold">{{ profileInfo.name }}</span>
          <span class="text-sm">{{ profileInfo.organization }}</span>
        </div>
      </div>

      <div class="item2 flex justify-end">
        <!-- ✅ Кнопка "Сообщение" с вызовом store -->
        <el-button
          round
          size="large"
          class="btn-main long fill-none !px-[134px] !text-[10xp]"
          :loading="chatStore.creating"
          @click="createChat"
        >
          <template #icon>
            <SvgoMessage filled />
          </template>
          Сообщение
        </el-button>

        <UIPopoverMenu :id="route.params.profile" :list="LIST_OPTIONS" @select="onSelect">
          <template #reference>
            <el-button circle :icon="'svgo-more'" class="btn-empty"></el-button>
          </template>
        </UIPopoverMenu>
      </div>
      <h2 class="custom-h2"><big class="text-700">Пользователь:</big> {{ persone.id }}</h2>
      <h2 class="custom-h2"><big class="text-700">Пользователь:</big> {{ persone.name }}</h2>
      <h1 class="custom-h1"><big class="text-700">ФИО:</big> {{ persone.fio }}</h1>
    </div>
  </section>
</template>

<script setup lang="ts">
import { DEFAULT_LOGO } from '~/constants/profile'
import { Picture as IconPicture } from '@element-plus/icons-vue'
import { useProfileStore } from '~/stores/profile'
import Image from '~/assets/image/image.png'
import Avatar from '~/assets/image/avatar.png'
import type { TPopoverItemProps } from '~/types/UI/popover'
import { onMounted, reactive } from 'vue'
import axios from 'axios'
import { useRoute, useRouter } from 'vue-router'
import { BASE_URL } from '~/env/requests.env'
import { useAuthStore } from '~/stores/auth'
import { useChatStore } from '~/stores/createChat' 

const { profileInfo } = useProfileStore()
const chatStore = useChatStore() 
const router = useRouter()
const route = useRoute()

const LIST_OPTIONS: TPopoverItemProps[] = [
  { key: 'complain-user', label: 'Пожаловаться' }
]

const authStore = useAuthStore()
if (authStore.isAdmin) {
  LIST_OPTIONS.push(
    { key: 'block-user', label: 'Заблокировать' },
    { key: 'delete-user', label: 'Удалить' }
  )
}

const persone = reactive({
  id: 'Загрузка...', // временно
  name: 'Загрузка...',
  fio: 'Загрузка...'
})

const getProfile = async () => {
  const id = route.params.profile
  const { accessToken } = useAuthStore()

  try {
    const response = await axios.get(`${BASE_URL}/user/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    })
    
    console.log('CurrentUSERid', response.data.id)
    console.log('TYPE OF CurrentUSERid', typeof response.data.id)
    persone.id = response.data.id
    persone.name = response.data.username
    persone.fio = response.data.name
    
  } catch (error) {
    console.error('Ошибка загрузки профиля:', error)
  }
}

// Создание чата через store
const createChat = async () => {
  try {
    const username = persone.name
    const userId = persone.id
    

    if (!username || username === 'Загрузка...') {
      ElMessage.warning('Имя пользователя не загружено')
      return
    }

    // Создаём чат
    // await chatStore.createChat(username)
    await chatStore.createChat(userId)


    // Перенаправляем на /chats 
    router.push('/chats')

  } catch (error) {
    console.log('Ошибка при создании чата:', error)
  }
}

onMounted(() => {
  getProfile()
})

const onSelect = (option: (typeof LIST_OPTIONS)[0]) => {
  console.log('option', option)
}
</script>

<style scoped>
.image_logo {
  width: 1040px;
  height: 195px;
}

.custom-h2 {
  font-size: 15px;
  margin-left: 20px;
}

.custom-h1 {
  font-size: 15px;
  margin-left: 20px;
}

.bg-fon {
  background-repeat: no-repeat;
  background-size: contain;
  background-position: top;
}
</style>