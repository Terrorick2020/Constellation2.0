<template>
  <div class="flex items-center block-wrapper settings-userInfo gap-[10px]">
    <el-avatar :size="48" :src="$images['avatar']" />
    <div class="flex flex-col gap-[4px]">
      <span class="font-bold">{{ username }}</span>
      <span class="text-xs opacity-40">ВКА им А.Ф.Можайского</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useAuthStore } from '~/stores/auth'

export default defineComponent({
  name: 'UserInfo',
  setup() {
    const authStore = useAuthStore()
    return {
      username: authStore.username 
    }
  }
})
</script>

