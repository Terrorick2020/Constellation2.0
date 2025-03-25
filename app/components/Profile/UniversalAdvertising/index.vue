<template>
  <section class="main-block-wrapper">
    <h2 class="mb-5 text-2xl font-bold">
      {{ title }}
    </h2>
    <p class="ml-1 mb-5 text-xl text-gray-700 font-semibold">Не задано</p>
    <div v-show="false" class="flex flex-col gap-[10px]">
      <el-collapse
        class="circle"
        v-for="(inventory, index) in inventories"
        :key="inventory.name"
        accordion
      >
        <el-collapse-item :name="index">
          <template #title>
            <div class="flex gap-2 text-xl font-bold">
              {{ inventory.name }}
              <div
                class="flex h-6 w-6 items-center justify-center rounded-full bg-main-gradient text-sm font-medium text-white"
              >
                {{ inventory.description.promotion.length }}
              </div>
            </div>
          </template>
          <ProfileGeneralTypesAdvertising :promotions="inventory.description.promotion" />
        </el-collapse-item>
      </el-collapse>
    </div>
  </section>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{ title: string }>(), {
  title: ''
})

const inventories = [
  {
    name: 'Ресепшн',
    description: {
      promotion: [
        { title: 'RostRoll', description: 'Рекламный ролик от партнера в конце видео' },
        { title: 'RostRoll', description: 'Рекламный ролик от партнера в конце видео' },
        { title: 'RostRoll', description: 'Рекламный ролик от партнера в конце видео' }
      ]
    }
  },
  {
    name: 'Мероприятия',
    peopleCount: '12.8M',
    viewCount: '488.7K',
    description: {
      subscribers: '12.8M',
      views: '488.7K',
      link: 'https://www.youtube.com/@BratishkinRof',
      er: '18.1%',
      promotion: [
        { title: 'RostRoll', description: 'Рекламный ролик от партнера в конце видео' },
        { title: 'RostRoll', description: 'Рекламный ролик от партнера в конце видео' },
        { title: 'RostRoll', description: 'Рекламный ролик от партнера в конце видео' }
      ]
    }
  }
]
</script>
