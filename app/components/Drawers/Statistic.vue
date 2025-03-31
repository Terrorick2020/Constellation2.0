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


const props = defineProps<{
    table: boolean
    setTable: (value: boolean) => void
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
</script>
