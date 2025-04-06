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
        
        <NuxtLink :to="`/chats/`" class="mr-3">
          <el-button round size="large" class="btn-main long fill-none !px-[134px] !text-[10xp]">
            <template #icon>
              <SvgoMessage filled />
            </template>
            Сообщение
          </el-button>
        </NuxtLink>
        
        <UIPopoverMenu :list="LIST_OPTIONS" @select="onSelect">
          <template #reference>
            <el-button circle :icon="'svgo-more'" class="btn-empty"></el-button>
          </template>
        </UIPopoverMenu>
        <!-- <el-button circle :icon="'svgo-more'" class="btn-empty"></el-button> -->
      </div>
      <h2 class="custom-h2"><big class="text-700">Пользователь:</big>  {{ persone.name }}</h2>
      <h1 class="custom-h1"><big class="text-700">ФИО:</big> ДОДЕЛАТЬ </h1>

      <!-- <p class="text-center text-sm opacity-40 lg:text-left">
        {{ profileInfo.description }}
      </p> -->

      <!-- <div class="flex flex-wrap gap-2">
        <el-tag v-for="item in profileInfo.tags" :key="item.id" round>
          {{ item.name }}
        </el-tag>
      </div> -->
      <!-- <div class="flex items-center gap-2 text-sm"><SvgoPin /> {{ profileInfo.location }}</div>
      <div v-if="profileInfo.site" class="flex items-center gap-2 text-sm underline">
        <SvgoGlobe /> {{ profileInfo.site }}
      </div> -->
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
import axios from 'axios';
import { useRoute } from 'vue-router';
import { BASE_URL, getHeaders } from '~/env/requests.env'




const { profileInfo } = useProfileStore()


const LIST_OPTIONS: TPopoverItemProps[] = [
  { key: 'complain', label: 'Пожаловаться', route: '/subscribe' },
  { key: 'block', label: 'Заблокировать', route: '/message' },
]

const props = defineProps<{
  username: string,
}>()

const persone = reactive({
  name: 'user 1',
  fio: 'Тараскин Илья Дмитриевич',
})

const getProfile = async () => {
  // const response = await getProfile(props.username)
  const route = useRoute();
  console.log("route", route);
  const id = route.params.id;
  console.log("id пользователя", id);

  const getCurrentUser = await axios.get(`${BASE_URL}/user/${id}`, {
    headers: {
      'Content-Type': 'application/json', 
    },
  });
    console.log(getCurrentUser.data)
    // username = getCurrentUser.data; // Присваиваем данные пользователя
    // console.log(user.value); 

  const response = {
    data: {
      name: 'user 1',
      fio: 'Тараскин Илья Дмитриевич',
    }
  }

  persone.name = response.data.name
  persone.fio = response.data.fio
}

onMounted(() => {
  getProfile()
})

const onSelect = (option: (typeof LIST_OPTIONS)[0]) => {
  console.log('option', option)
}
</script>


<!-- три точки:
     Пожаловаться
     Заблокировать (ТОЛЛЬКО ДЛОЯ АДМИНА)
     Заблокать
      -->


<style scoped>
.image_logo {
  width: 1040px;
  height: 195px;
}
.custom-h2{
  font-size: 15px;
  margin-left:20px
}

.custom-h1{
  font-size: 15px;
  margin-left:20px;
}

.bg-fon {
  background-repeat: no-repeat;
  background-size:contain;
  background-position: top;
}
</style>