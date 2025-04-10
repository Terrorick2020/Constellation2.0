<template>
  <div class="flex w-full flex-col">
    <div class="mb-5 flex flex-col gap-[10px] lg:flex-row">
      <el-input
        v-model="searchQuery"
        size="large"
        placeholder="Поиск по названию и др...."
        class="h-[60px] max-w-full w-full"
        @input="searchDocs"
      >
        <template #prefix>
          <SvgoSearch filled class="h-6 w-[30px]" :font-controlled="false" />
        </template>
      </el-input>
      <div class="flex items-center gap-x-[10px] grow">
        <Sort @sortChange="handleSortChange" />
        <UIButton
          v-if="authStore.isAdmin"
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
                    :percentage="Math.floor((doc.signCount / doc.usersCount) * 100)"
                    :stroke-width="15"
                    status="success"
                    striped
                    striped-flow
                    :duration="duration"
                    :text-inside="true"
                    color="#409EFF"
                  />
                </div>
                <p class="text-sm text-gray-500">Подписали: {{ doc.signCount }} из {{ doc.usersCount }}</p>
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
import { useAuthStore } from '~/stores/auth'
import { BASE_URL } from '~/env/requests.env'
import axios from 'axios'

const authStore = useAuthStore()

const targetDocId = ref<string>('')
const percentage = ref<number>(50)
const searchQuery = ref('')
const load = ref(false)
const sortOption = ref<string>('1')

const allDataLoaded = ref(false)

const duration = computed(() => Math.floor(percentage.value / 5))

interface Document {
  id: number
  title: string
  date: string
  signCount: number
  usersCount: number
  signatures?: number
  volume?: number
}

const listDocs: Document[] = []
const visibleDocs = ref<Document[]>([])

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
      case '2':
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      case '3':
        return (b.signatures || 0) - (a.signatures || 0)
      case '4':
        return (b.volume || 0) - (a.volume || 0)
      default:
        return a.id - b.id
    }
  })
})

const displayedDocs = computed(() => sortedDocs.value)

const drawer = ref(false)
const setDrawer = (value: boolean) => drawer.value = value

const table = ref(false)
const setTable = (value: boolean) => table.value = value

let currentPage = 1
let lastResponseHash = ''

const getDocs = async (page = 1, limit = 5) => {
  if (allDataLoaded.value) {
    return
  }

  const {accessToken} = useAuthStore()
  load.value = true
  try {
    const response = await axios.get(`${BASE_URL}/post?page=${page}&limit=${limit}`,{

      headers: {
        'Authorization': `Bearer ${accessToken}`
      }

    }





    )
    const data = response.data.data

    console.log( data )

    const responseHash = JSON.stringify(data)

    if (responseHash === lastResponseHash) {
      return
    }

    lastResponseHash = responseHash

    if (data.length === 0) {
      allDataLoaded.value = true // Флаг, что всё загружено
      return
    }

    data.forEach((doc: any) => {
      listDocs.push({
        id: doc.id,
        title: doc.title,
        date: doc.date,
        signCount: doc.sigCount,
        usersCount: doc.userCount,
      })
    })

    visibleDocs.value = listDocs.slice(0, listDocs.length)
  } catch (error) {
  } finally {
    load.value = false
  }
}

const loadMoreDocs = () => {
  if (load.value || allDataLoaded.value) {
    return
  }

  currentPage++
  getDocs(currentPage)
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

const getTargetDoc = (id: string) => {
  targetDocId.value = id
}



const getProgressBar = async () => {


  const response = await axios.get(`${BASE_URL}/post`,{
    headers: {
      'Authorization': `Bearer ${authStore.accessToken}`
    }

  })
  console.log("htcgjyctttt", response)

}

onMounted(() => {
  getDocs(currentPage)
  getProgressBar()
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
