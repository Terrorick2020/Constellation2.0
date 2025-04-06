<template>
  <div class="flex w-full flex-col">
    <div class="mb-5 flex flex-col gap-[10px] lg:flex-row">
      <el-input
        v-model="searchQuery"
        size="large"
        placeholder="Поиск по названию и др...."
        class="h-[60px] max-w-full lg:max-w-[835px]"
        @input="searchDocs"
      >
        <template #prefix>
          <SvgoSearch filled class="h-6 w-[30px]" :font-controlled="false" />
        </template>
      </el-input>
      <div class="flex items-center gap-x-[10px] grow">
        <Sort />
        <UIButton
          ref="add"
          icon-name="plus"
          :class="{ '!bg-white': false }"
          @click="setDrawer(true)"
        />
      </div>
    </div>

    <div class="space-y-[10px]">
      <div
        v-for="(doc, index) in displayedDocs"
        :key="doc.id"
        class="flex w-full flex-col gap-[10px]"
      >
        <!-- Here keep document info -->
        <Company :item="doc" :setTable="setTable" index-page />

        <div class="border border-black/15 p-4 flex flex-col gap-y-[20px] bg-white rounded-2xl">
          <div class="flex flex-col gap-[10px]">
            <h2 class="text-xs font-extrabold text-black/50 uppercase leading-[110%]">Количество людей, подписавших документ</h2>
            <div class="demo-progress">
              <el-progress
                :percentage="percentage"
                :stroke-width="15"
                status="success"
                striped
                striped-flow 
                :duration="duration"
                :text-inside="true"
                color="#409EFF"
              />
            </div>
            <p class="text-sm text-gray-500">Подписали: {{ 50 }} из {{ 100 }}</p> 
          </div>
        </div>
      </div>
    </div>

    <DrawersLoadDoc :drawer="drawer" :setDrawer="setDrawer" />
    <DrawersStatistic :table="table" :setTable="setTable" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { BASE_URL, POSTS_ENDPOINT, getHeaders } from '~/env/requests.env'
import { useAuthStore } from '#imports'
import { useProfileStore } from '~/stores/profile'
import { useFiltersStore } from '~/stores/filters'
import axios from 'axios';

const percentage = ref<number>(50) // Начальный процент
const searchQuery = ref(''); // Строка поиска

const duration = computed(() => Math.floor(percentage.value / 5)) // Длительность анимации

const listDocs = [
  { id: 0, name: 'Документ 1', slug: 'doc-1' },
  { id: 1, name: 'Документ 2', slug: 'doc-2' },
  { id: 2, name: 'Документ 3', slug: 'doc-3' },
  { id: 3, name: 'Документ 4', slug: 'doc-4' },
  { id: 4, name: 'Документ 5', slug: 'doc-5' },
  { id: 5, name: 'Документ 6', slug: 'doc-6' },
  { id: 6, name: 'Документ 7', slug: 'doc-7' },
  { id: 7, name: 'Документ 8', slug: 'doc-8' },
  { id: 8, name: 'Документ 9', slug: 'doc-9' },
  { id: 9, name: 'Документ 10', slug: 'doc-10' },
  { id: 10, name: 'Документ 11', slug: 'doc-11' },
  { id: 11, name: 'Документ 12', slug: 'doc-12' },
  { id: 12, name: 'Документ 13', slug: 'doc-13' },
  { id: 13, name: 'Документ 14', slug: 'doc-14' },
  { id: 14, name: 'Документ 15', slug: 'doc-15' },
  { id: 15, name: 'Документ 16', slug: 'doc-16' },
  { id: 16, name: 'Документ 17', slug: 'doc-17' },
]

const visibleDocs = ref(listDocs.slice(0, 5))

// Результаты поиска
const searchResults = computed(() => {
  if (!searchQuery.value.trim()) return [] // Если строка поиска пустая, возвращаем пустой массив
  return listDocs.filter(doc =>
    doc.name.toLowerCase().includes(searchQuery.value.toLowerCase().trim())
  )
})

// Отображаемые документы: либо результаты поиска, либо видимые документы
const displayedDocs = computed(() => {
  return searchQuery.value.trim() ? searchResults.value : visibleDocs.value
})

const drawer = ref(false)
const setDrawer = (value: boolean) => drawer.value = value

const table = ref(false)
const setTable = (value: boolean) => table.value = value

const loadMoreDocs = () => {
  const currentLength = visibleDocs.value.length
  if (currentLength < listDocs.length) {
    const newDocs = listDocs.slice(currentLength, currentLength + 5)
    visibleDocs.value.push(...newDocs)
  }
}

const onScroll = () => {
  const scrollPosition = window.scrollY + window.innerHeight
  let bottomPosition = document.documentElement.scrollHeight

  const foot = document.getElementById('app-footer')
  if (foot) bottomPosition -= foot.offsetHeight

  if (scrollPosition >= bottomPosition) {
    loadMoreDocs()
  }
}

let timeout: ReturnType<typeof setTimeout>

watch(searchQuery, (newQuery) => {
  clearTimeout(timeout)
  timeout = setTimeout(() => {

  }, 500)
})

const page = ref<number>(1)
const limit = ref<number>(1)
let all_posts = []

const getDocs = async () => {
  const postListResponse = await axios.get(`${BASE_URL}/post`, {
					params: { page: page, limit: limit }
				})

  all_posts = postListResponse.data
  console.log('all_posts', all_posts)
        
  const response = await axios.get(
    `${BASE_URL}${POSTS_ENDPOINT}`,
    {
      params: { page: page, limit: limit }
    }
  )

  const resDocs = response.data.result

  switch( resDocs ) {
    case 'success':
      page.value ++
      limit.value ++
      break
    case 'failed':
      break
  }
}

const getNextDocs = async () => {
  const response = await axios.get(
    `${BASE_URL}${POSTS_ENDPOINT}`,
    {
      params: { page: page, limit: limit }
    }
  )

  const resDocs = response.data.result

  switch( resDocs ) {
    case 'success':
      
      page.value ++
      limit.value ++
      break
    case 'failed':
      break
  }
}

const getTargetDoc = async () => {}

onMounted(() => {
  getDocs()
  window.addEventListener('scroll', onScroll)
})
</script>

<style scoped>
.demo-progress .el-progress--line {
  margin-bottom: 15px;
  max-width: 600px;
  border: 2px solid black;
  border-radius: 15px;
}

.btn-add {
  height: 100%;
}
</style>