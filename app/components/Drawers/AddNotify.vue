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
                <el-button class="w-[45%]" type="primary" @click="submitForm(ruleFormRef)">Рассылка</el-button>
                <el-button class="w-[45%]" @click="resetForm(ruleFormRef)">Сброс</el-button>
            </el-form-item>
        </el-form>
    </el-drawer>
</template>
  
<script lang="ts" setup>
import { ElMessageBox } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'


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

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!', fields)
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>