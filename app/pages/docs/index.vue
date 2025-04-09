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
      <div v-if="authStore.isAdmin" class="flex items-center gap-x-[10px] grow">
        <Sort @sortChange="handleSortChange" />
        <UIButton
          ref="add"
          icon-name="plus"
          :class="{ '!bg-white': false }"
          @click="setDrawer(true)"
        />
      </div>
    </div>

    <el-container class="w-full docs" style="padding: 0; margin: 0; background: transparent;" v-loading="load">
      <el-main style="padding: 0; margin: 0; background: transparent;">
        <div class="space-y-[10px]">
          <div
            v-for="(doc, index) in displayedDocs"
            :key="doc.id"
            class="flex w-full flex-col gap-[10px]"
          >
            <Company :func="getTargetDoc" :item="doc" :setTable="setTable" index-page />

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
      </el-main>
    </el-container>

    <DrawersLoadDoc :drawer="drawer" :setDrawer="setDrawer" />
    <DrawersStatistic :docId="targetDocId" :table="table" :setTable="setTable" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import {useAuthStore} from "~/stores/auth"
import { BASE_URL } from '~/env/requests.env'
import axios from 'axios'


const authStore = useAuthStore()

const targetDocId = ref<string>( '' )
const percentage = ref<number>( 50 )
const searchQuery = ref( '' )
const load = ref( true )
const sortOption = ref<string>( '1' ) // Значение по умолчанию для сортировки

const duration = computed(() => Math.floor(percentage.value / 5))

interface Document {
  id: number
  title: string
  date: string
  signatures?: number
  volume?: number
}

const listDocs: Document[] = []

const visibleDocs = ref<Document[]>(listDocs.slice(0, 5))

const searchResults = computed(() => {
  if (!searchQuery.value.trim()) return []
  return listDocs.filter(doc =>
    doc.title.toLowerCase().includes(searchQuery.value.toLowerCase().trim())
  )
})

// Сортировка
const sortedDocs = computed(() => {
  const docs = searchQuery.value.trim() ? searchResults.value : visibleDocs.value
  return [...docs].sort((a, b) => {
    switch (sortOption.value) {
      case '2': // По дате (новые сверху)
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      case '3': // По количеству подписей
        return (b.signatures || 0) - (a.signatures || 0)
      case '4': // По объему документа
        return (b.volume || 0) - (a.volume || 0)
      default: // По умолчанию (релевантность)
        return a.id - b.id
    }
  })
})

const displayedDocs = computed(() => sortedDocs.value)

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

watch(searchQuery, () => {
  clearTimeout(timeout)
  timeout = setTimeout(() => {}, 500)
})

// Получение документов
const getDocs = async () => {
  load.value = true
  console.log( load.value )

  try {
    const response = await axios.get(`${BASE_URL}/post`)
    const data = response.data.data

    data.forEach((doc: any) => {
      listDocs.push({
        id: doc.id,
        title: doc.title,
        date: doc.date,
        signatures: doc.signatures || Math.floor(Math.random() * 100), // Пример, если нет данных
        volume: doc.volume || Math.floor(Math.random() * 50), // Пример, если нет данных
      })
    })

    visibleDocs.value = listDocs.slice(0, 5)
  } catch (error) {
    console.error('Ошибка при загрузке документов:', error)
  } finally {
    // load.value = false
  }
}

// Обработчик выбора сортировки
const handleSortChange = (selectedSort: string) => {
  sortOption.value = selectedSort
}



const getTargetDoc = (id: string) => {
  targetDocId.value = id
}


onMounted(() => {
  getDocs()
  window.addEventListener('scroll', onScroll)
})
</script>

<style scoped lang="scss">
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
