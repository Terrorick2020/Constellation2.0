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
        <el-radio :value="item.value" size="large" v-for="item in radioList" :key="item.value">
          {{ item.label }}
        </el-radio>
      </div>
    </el-radio-group>
  </UIModal>
</template>

<script setup lang="ts">
import type { ButtonInstance } from 'element-plus'
import { ref, watch } from 'vue';

const sort = ref<ButtonInstance>()
const sortVisible = ref(false)
const radio1 = ref('1')
const emit = defineEmits(['sortChange'])

const radioList = ref([
  { label: 'По релевантности ЦА', value: '1' },
  { label: 'По дате', value: '2' },
  { label: 'По количеству подписей', value: '3' },
  { label: 'По объему документа', value: '4' },
])

watch(radio1, (newVal) => {
  emit('sortChange', newVal)
  sortVisible.value = false // Закрывать модалку после выбора
})
</script>
