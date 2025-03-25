<template>
  <div class="flex flex-col gap-[15px]">
    <a v-if="!indexPage" class="text-link" :href="link" target="_blank">{{ link }}</a>

    <div class="flex flex-wrap gap-y-3" :class="containerClasses">
      <ProfileOnlineInventoryStatisticBlock
        :label="'Подписок:'"
        :value="subscribers"
        :indexPage="indexPage"
      />

      <ProfileOnlineInventoryStatisticBlock
        :label="'Просмотров:'"
        :value="views"
        :indexPage="indexPage"
      />

      <ProfileOnlineInventoryStatisticBlock
        v-if="!indexPage"
        :label="'ER:'"
        :value="er"
        :indexPage="indexPage"
      />
    </div>

    <ProfileGeneralTypesAdvertising v-if="!indexPage" :promotions="promotions" />
  </div>
</template>

<script setup lang="ts">
import type { ProfileInventoryDescriptionProps } from '~/types/profile/inventory.ts'

const props = withDefaults(defineProps<ProfileInventoryDescriptionProps>(), {
  indexPage: false,
  link: '',
  subscribers: '0',
  views: '0',
  er: '0',
  promotions: () => []
})

const containerClasses = computed(() => ({
  'gap-5': props.indexPage,
  'gap-x-[27px]': !props.indexPage
}))
</script>
