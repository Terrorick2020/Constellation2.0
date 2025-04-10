<template>
    <el-drawer
      v-model="props.dialog"
      size="50%"
      title="Общее объявление"
      class="demo-drawer"
      @close="handleClose"
    >
        <el-form
            ref="ruleFormRef"
            style="max-width: 600px"
            :model="ruleForm"
            :rules="rules"
        >
            <el-form-item label="Оглавление" prop="name">
                <el-mention v-model="ruleForm.name" :options="options" />
            </el-form-item>
            <br>
            <el-form-item label="Содержание" prop="desc">
                <el-mention v-model="ruleForm.desc" type="textarea" />
            </el-form-item>
            <br>
            <el-form-item class="w-full">
                <el-button class="w-[45%] f_btn" type="primary" @click="submitForm(ruleFormRef)">Рассылка</el-button>
                <el-button class="w-[45%] s_btn" @click="resetForm(ruleFormRef)">Сброс</el-button>
            </el-form-item>
        </el-form>
    </el-drawer>
</template>
  
<script lang="ts" setup>
import { ElMessageBox } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import axios from 'axios'
import { BASE_URL} from '~/env/requests.env'
import { useAuthStore } from '~/stores/auth'
import { ApiResType } from '../../types/auth'

const props = defineProps<{
    dialog: boolean
    setDialog: (value: boolean) => void
}>()

const handleClose = (done) => {
    props.setDialog( false )
}

interface RuleForm {
  name: string
  desc: string
}
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
  name: '',
  desc: '',
})

const options = ref([
  {
    label: 'Fuphoenixes',
    value: 'Fuphoenixes',
  },
  {
    label: 'kooriookami',
    value: 'kooriookami',
  },
  {
    label: 'Jeremy',
    value: 'Jeremy',
  },
  {
    label: 'btea',
    value: 'btea',
  },
])

const rules = reactive<FormRules<RuleForm>>({
  name: [{ required: true, message: 'Заполните название', trigger: 'blur' }],
  desc: [{ required: true, message: 'Заполните описание', trigger: 'blur' }],
})





const sendNoty = async () => {
  console.log("dadadadadadada")
  const data = {
    title: ruleForm.name,
    description: ruleForm.desc
  }

  const { accessToken } = useAuthStore();
  const sendNoty = await axios.post(`${BASE_URL}/notify`, data, {

    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
    
  })
  console.log(sendNoty)
  const authStore = useAuthStore()

  switch (sendNoty.data.result) {
    case 'success': 
    authStore.apiRes.value = true
    authStore.apiRes.type = ApiResType.success
    authStore.apiRes.title = 'Ура!'
    authStore.apiRes.msg = 'Успешная отправка уведомления'
    break
    case 'failed':
    authStore.apiRes.value = true
    authStore.apiRes.type = ApiResType.error
    authStore.apiRes.title = 'Ошибка!'
    authStore.apiRes.msg = 'Не удалось отправить уведомление'
  }

}

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
      sendNoty()

    } else {
      console.log('error submit!', fields)
    }
  })

  reloadNuxtApp()
  
}


const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>

<style scoped lang="scss">
.f_btn {
  background: linear-gradient(#ff6c46, #e44820);
  color: #ffffff;
  font-weight: 800 !important;
  border-color: #724439;
  border-radius: 26px;

  &:active {
      border-color: #e44820;
      scale: 0.99;
  }
}

.s_btn {
  font-weight: 800 !important;
  border-radius: 26px;
  --el-button-hover-bg-color: #ff6b4616;
  --el-button-hover-border-color: #ff6b464d;


  &:active {
      border-color: #e44820;
      background-color: rgb(253, 100, 61)4d;
      scale: 0.99;
  }
}
</style>