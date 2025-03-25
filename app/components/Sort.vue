<template>
  <UIButton
    ref="sort"
    icon-name="menu"
    :class="{ '!bg-white': sortVisible }"
    @click="sortVisible = !sortVisible"
  />
  <UIModal v-model="sortVisible" :target-ref="sort" title="Сортировка" width="430">
    <el-radio-group class="pt-5" v-model="radio1">
      <div class="flex flex-col gap-[10px]">
        <el-radio :value="item.value" size="large" v-for="item in radioList">
          {{ item.label }}
        </el-radio>
      </div>
    </el-radio-group>
  </UIModal>
</template>

<script setup lang="ts">
import type { ButtonInstance } from 'element-plus'

const sort = ref<ButtonInstance>()
const sortVisible = ref(false)
const radio1 = ref('1')

const radioList = ref([
  {
    label: 'По релевантности ЦА',
    value: '1'
  },
  {
    label: 'Недавно зарегистрированные',
    value: '2'
  },
  {
    label: 'Сначала по бартеру',
    value: '3'
  },
  {
    label: 'Сначала взаимно',
    value: '4'
  },
  {
    label: 'Сначала платно',
    value: '5'
  }
])
</script>
