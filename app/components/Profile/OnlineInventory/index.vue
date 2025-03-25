<template>
  <section class="main-block-wrapper">
    <h2 class="mb-5 text-2xl font-bold">Онлайн инвентарь</h2>
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
            <ProfileOnlineInventoryHeader
              :socialName="inventory.name"
              :people-count="inventory.peopleCount"
              :view-count="inventory.viewCount"
            />
          </template>
          <ProfileOnlineInventoryDescription
            :link="inventory.description.link"
            :er="inventory.description.er"
            :subscribers="inventory.description.subscribers"
            :views="inventory.description.views"
            :promotions="inventory.description.promotion"
          />
        </el-collapse-item>
      </el-collapse>
    </div>
  </section>
</template>
<script setup lang="ts">
const inventories = [
  {
    name: 'telegram',
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
  },
  {
    name: 'instagram',
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
  },
  {
    name: 'youtube',
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
