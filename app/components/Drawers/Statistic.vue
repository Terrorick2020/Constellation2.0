<template>
    <el-drawer
      v-model="props.table"
      title="Список подписи документа пользователями"
      direction="rtl"
      size="50%"
      @close="handleClose"
    >
        <el-table
            :data="gridData"
            :default-sort="{ prop: 'date', order: 'descending' }"
        >
        <el-table-column property="date" label="Дата" sortable width="150" />
        <el-table-column property="status" label="Статус" sortable width="100">
            <template #default="scope">
                <el-tag
                    class="w-full"
                    disable-transitions
                    :type="scope.row.status === 'none' ? 'error' : 'success'"
                >
                    {{ scope.row.status }}
                </el-tag>
            </template>
        </el-table-column>
        <el-table-column property="fullname" label="Фио" sortable />
      </el-table>
      <br>
      <el-button class="w-full mt-5"  @click="sendNotify">Отправить напомнание неподписавшим</el-button>
    </el-drawer>
</template>
  
<script lang="ts" setup>
import { dateEquals, ElMessageBox } from 'element-plus'
import { BASE_URL } from '~/env/requests.env'
import {ref, onMounted, watch} from 'vue'
import axios from 'axios'
import {useAuthStore} from "~/stores/auth"


const props = defineProps<{
    table: boolean
    setTable: (value: boolean) => void
    docId: string
}>()

const table = ref(false)

const handleClose = (done) => {
    props.setTable( false )
}

const sendNotify = () => {
    sendNoty()
}

interface GridDataitem {
    date: string,
    status: string,
    fullname: string
    
}
const gridData = ref<GridDataitem[]>([
])


const getStatistic = async(newValue:string) => {
  console.log('docId для запроса:', newValue)
  if (!newValue) return;
  console.log('docId для запроса:', newValue)

  const {accessToken} = useAuthStore()
  const getStat = await axios.get(`${BASE_URL}/admin/subs/${newValue}`, {
    headers: {
        'Authorization': `Bearer ${accessToken}`
    }
  })
  gridData.value = []
  getStat.data.data.forEach((element:any) => {
      gridData.value.push({
        date: element.assignedAt,
        status: element.signed ? 'success' : 'none',
        fullname: element.name,
      })
  })
  console.log("ЧТО ТО", getStat)


}




const sendNoty = async () => {
  const {accessToken} = useAuthStore()
  const getDocs = await axios.get(`${BASE_URL}/post/${props.docId}`, {
    headers: {
        'Authorization': `Bearer ${accessToken}`
    }
  })


  const title = getDocs.data.data.title
  let text = `🔥Нижеуказанным пользователям неодходимо подписать документ: «${title}»🔥\n\n` 
  gridData.value.forEach((element:any) => {
      if (element.status === 'none') {
          text += `❌ ${element.fullname },\n`

      }
  })
  
  const data = {
    title: 'Напоминание о подписи',
    description: text,
  }

  const sendNoty = await axios.post(`${BASE_URL}/notify`, data, {

    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
    
  })
  console.log(sendNoty)

}


// onMounted(() => {
//     getStatistic()
// })

watch(() => props.table, (newValue) => {   
    if (newValue) {
        getStatistic(props.docId)
    }

})

</script>
