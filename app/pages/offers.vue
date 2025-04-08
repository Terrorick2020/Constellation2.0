<template>
  <div class="flex w-full flex-col gap-[30px]">
    <div class="flex flex-col gap-1">
      <div class="flex flex-col gap-2 lg:flex-row">
        <div class="el-input el-input--large el-input--prefix">
          <div class="el-input__wrapper" tabindex="-1">
            <span class="el-input__prefix"
              ><span class="el-input__prefix-inner"
                ><i class="el-icon el-input__icon"
                  ><svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    class="nuxt-icon nuxt-icon--fill"
                  >
                    <g data-name="Layer 2">
                      <path
                        d="m20.71 19.29-3.4-3.39A7.92 7.92 0 0 0 19 11a8 8 0 1 0-8 8 7.92 7.92 0 0 0 4.9-1.69l3.39 3.4a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42zM5 11a6 6 0 1 1 6 6 6 6 0 0 1-6-6z"
                        data-name="search"
                      ></path>
                    </g></svg></i></span></span
            ><input
              class="el-input__inner"
              type="text"
              autocomplete="off"
              tabindex="0"
              placeholder="Поиск по названию и др...."
              id="el-id-1024-9"
            />
          </div>
        </div>
        <Filters />
        <Sort />
        <UIButton v-if="authStore.isAdmin"
          ref="add"
          icon-name="plus"
          :class="{ '!bg-white': false }"
          @click="setDialog(true)"
        />
      </div>
      <div class="mt-[15px] flex flex-col gap-[15px]">
        <el-card style="width: 100%; border-radius: 10px;" v-for="item in notiList">
        <template #header>
          <div class="card-header">
            <span>{{ item.title }}</span>
          </div>
        </template>
        <p style="white-space: pre-line;">{{item.description}}</p>
        </el-card>
      </div>



      <!-- <div class="el-select__selected-item">
        <span
          class="el-tag is-closable el-tag--info el-tag--default el-tag--light"
          style="max-width: 293px; background-color: rgb(144 144 144 / var(--tw-bg-opacity))"><span class="el-tag__content">
            <span class="el-select__tags-text">Ростов-на-Дону</span></span>
          <i class="el-icon el-tag__close"
            ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
              <path
                fill="currentColor"
                d="M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z"
              ></path></svg></i
        ></span>
      </div> -->
    </div>
    <div class="flex flex-wrap justify-between gap-7">
      <Offer />
      <Offer />
      <Offer />
      <Offer />
      <Offer />
    </div>
  </div>
  <DrawersAddNotify :dialog="dialog" :setDialog="setDialog" />
</template>

<script setup lang="ts">
import {useAuthStore} from "~/stores/auth"
import axios from 'axios'
import {ref, onMounted} from 'vue'
import { BASE_URL } from '~/env/requests.env'



const authStore = useAuthStore()

useSeoMeta({
  title: 'Уведомления',
  ogTitle: 'Уведомления',
  description: 'Страница уведомлений',
  ogDescription: 'Страница уведомлений',
})

const add = ref<ButtonInstance>( )
const dialog = ref<boolean>( false )
const setDialog = ( value: boolean ) => dialog.value = value;

const notiList = ref([])
const limit = ref(5)
const page = ref(1)
const getNot = async () => {
  const { accessToken } = useAuthStore();
  const getNotQuery = await axios.get(`${BASE_URL}/notify?page=${page.value}&limit=${limit.value}`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    }

  });

  console.log("ГОВНО", getNotQuery)
  notiList.value = getNotQuery.data.data

}





onMounted (() => {

  getNot()

})



</script>
