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
        <el-table-column property="username" label="Пользователь" sortable width="200" />
        <el-table-column property="fullname" label="Фио" sortable />
      </el-table>
      <br>
      <el-button class="w-full mt-5"  @click="sendNotify">Отправить напомнание неподписавшим</el-button>
    </el-drawer>
</template>
  
<script lang="ts" setup>
import { ElMessageBox } from 'element-plus'
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
    console.log( 'уведомления для неподписавших отправлены!' )
}
  
const gridData = [
    {
        date: '2016-05-02',
        status: 'success',
        username: 'User 1',
        fullname: 'Лоскутов Егор Алексеевич',
    },
    {
        date: '2015-05-02',
        status: 'none',
        username: 'User 2',
        fullname: 'Лоскутов Егор Алексеевич',
    },
    {
        date: '2016-05-07',
        status: 'success',
        username: 'User 1',
        fullname: 'Лоскутов Егор Алексеевич',
    },
    {
        date: '2016-10-02',
        status: 'none',
        username: 'User 1',
        fullname: 'Лоскутов Егор Алексеевич',
    },
]


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
  console.log("ЧТО ТО", getStat)


}

// onMounted(() => {
//     getStatistic()
// })
watch(() => props.docId, (newValue) => {
    getStatistic(newValue)
})


</script>
