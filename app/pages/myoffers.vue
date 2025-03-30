<template>
  <div class="my-offers-container flex w-full flex-col gap-[20px] pt-1">
    <h1 class="mt-2 text-2xl font-bold">Мои обьявления</h1>
    <div class="flex w-full gap-7">
      <div class="flex w-full flex-col gap-3">
        <div id="my-offer-header" class="flex h-[60px] w-[540px] flex-wrap gap-4">
          <div
            class="basic-block flex w-full cursor-pointer items-center justify-start"
            style="padding-left: 10px"
          >
            <span class="flex gap-5" style="padding-left: 20px">
              <span
                :class="{ 'font-bold': isActive, 'text-gray-500': !isActive }"
                @click="toggleTab(true)"
                >Активные</span
              >
              <span
                :class="{ 'font-bold': !isActive, 'text-gray-500': isActive }"
                @click="toggleTab(false)"
                >Архивные</span
              >
            </span>
          </div>
          <Sort />
        </div>

        <div v-if="isActive">
          <div class="offer-info basic-block flex flex-col gap-4 bg-white">
            <div class="flex flex-col gap-2">
              <h2 class="text-lg font-bold">Документ 1</h2>
            </div>
            <div>
              <el-button round :icon="SVGEdit" class="btn-empty" style="font-weight: 900"
                >Перейти к документу</el-button>
              <el-button round :icon="SVGPlus" class="btn-empty" style="font-weight: 900"
                >Добавить в архив</el-button>
            </div>
          </div>

          <div class="offer-info basic-block flex flex-col gap-4 bg-white">
            <div class="flex flex-col gap-2">
              <h2 class="text-lg font-bold">Документ 2</h2>
            </div>
            <div>
              <el-button round :icon="SVGEdit" class="btn-empty" style="font-weight: 900"
                >Перейти к документу</el-button>
              <el-button round :icon="SVGPlus" class="btn-empty" style="font-weight: 900"
                >Добавить в архив</el-button>
            </div>
          </div>

          <div class="offer-info basic-block flex flex-col gap-4 bg-white">
            <div class="flex flex-col gap-2">
              <h2 class="text-lg font-bold">Документ 3</h2>
            </div>
            <div>
              <el-button round :icon="SVGEdit" class="btn-empty" style="font-weight: 900"
                >Перейти к документу</el-button>
              <el-button round :icon="SVGPlus" class="btn-empty" style="font-weight: 900"
                >Добавить в архив</el-button>
            </div>
          </div>
        </div>

        <div v-else>
          <!-- Архивные объявления -->
          <div class="offer-info basic-block flex flex-col gap-4 bg-white">
            <div class="flex flex-col gap-2">
              <h2 class="text-lg font-bold">Документ 2</h2>
            </div>
            <div>
              <el-button round :icon="SVGEdit" class="btn-empty" style="font-weight: 900"
                >Перейти к документу</el-button
              >
              <el-button round :icon="SWGClose" class="btn-empty" style="font-weight: 900"
                >Убрать из архива</el-button>
            </div>
          </div>

          <div class="offer-info basic-block flex flex-col gap-4 bg-white">
            <div class="flex flex-col gap-2">
              <h2 class="text-lg font-bold">Документ 3</h2>
            </div>
            <div>
              <el-button round :icon="SVGEdit" class="btn-empty" style="font-weight: 900"
                >Перейти к документу</el-button
              >
              <el-button round :icon="SWGClose" class="btn-empty" style="font-weight: 900"
                >Убрать из архива</el-button>
            </div>
          </div>
        </div>
      </div>

      <!-- Блок уведомлений, который зависит от вкладки -->
      <div id="balance-offer" class="flex flex-col gap-2">
        <div
          class="basic-block flex w-[345px] flex-col gap-4"
          style="padding: 30px; max-height: 192px; background-color: #00ffff"
        >
          <div class="flex flex-col gap-1">
            <span class="text-xs font-bold">Количество уведомлений</span>
            <!-- Отображаем количество уведомлений в зависимости от вкладки -->
            <span class="text-2xl font-bold">{{
              isActive ? activeNotifications : archivedNotifications
            }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SVGEdit from '@/assets/icons/edit.svg'
import SVGPlus from '@/assets/icons/plus.svg'
import SWGClose from '@/assets/icons/close-outline.svg'

// Состояние для отслеживания активной вкладки (активные или архивные)
const isActive = ref(true) // По умолчанию показываем "активные"

// Количество уведомлений для каждой вкладки
const activeNotifications = ref(3) // Количество уведомлений для активных
const archivedNotifications = ref(2) // Количество уведомлений для архивных

// Метод для переключения вкладки
const toggleTab = (isActiveTab: boolean) => {
  isActive.value = isActiveTab
}
</script>

<style scoped>
/* Стили для вкладок, активные и архивные */
#my-offer-header span:hover {
  cursor: pointer;
}

.basic-block {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
}
</style>
