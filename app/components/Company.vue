<template>
  <div class="flex flex-col gap-[10px] text-sm">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-x-[10px]">
        <el-avatar :size="48" :src="Avatar" class="border border-black/15" />
        
        <div class="flex flex-col">
          <!-- TODO: Username -->
          <span class="font-extrabold text-base">{{ props.item.title }} </span>
          <span class="text-sm opacity-80 leading-[140%]">{{ formatDate(props.item.date)}}</span>
          <span v-if="!authStore.isAdmin" class="text-sm opacity-80 leading-[140%]">
            {{ documentStatus === 'success' ? '✅ Подписан' : '❌ Не подписан' }}
          </span>


          <!-- TODO: Подразделение -->
          <!-- <span class="text-sm opacity-40 leading-[140%]">61 кафедра</span> -->
        </div>
      </div>
      <div v-if="indexPage" class="flex items-center transition-all group-hover:translate-x-[2px] gap-x-[10px]">
        <UIPopoverMenu :func="props.func" :list="LIST_OPTIONS" :setTable="setTable" :id="props.item.id" @select="onSelect">
          <template #reference>
            <el-button circle :icon="'svgo-more'" class="btn-empty"></el-button>
          </template>
        </UIPopoverMenu>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useDocumentStore } from '~/stores/documentStore'
import Avatar from '~/assets/image/avatar.png'
import type { TPopoverItemProps } from '~/types/UI/popover'
import { onMounted, ref, computed } from 'vue'
import axios from 'axios';
import { BASE_URL, getHeaders } from '~/env/requests.env'
import { useSignStore } from '~/stores/signStore'
import { useAuthStore } from '~/stores/auth'



const signStore = useSignStore()
const router = useRouter()
const documentStore = useDocumentStore()
const authStore = useAuthStore()

const props = withDefaults(
  defineProps<{
    indexPage?: boolean
    item: { name: string; date: string; title: string, signCount: number,usersCount: number, slug: string, id: string}
    func: (id: string) => void
    setTable: (value: boolean) => void
  }>(),
  {
    indexPage: false
  }
)

const documentStatus = computed(() => signStore.getDocumentStatus(props.item.id))

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${hours}:${minutes}:${seconds} ${day}-${month}-${year} `;
}




const LIST_OPTIONS: TPopoverItemProps[] = [
  { key: 'viewdoc', label: 'К документу', },
  { key: 'copy', label: 'Скопировать ссылку'},
  // { key: 'statistics', label: 'Посмотреть статистику' },
  // { key: 'delete', label: 'Удалить документ' }
]

if (authStore.isAdmin) {

    LIST_OPTIONS.push(
    { key: 'statistics', label: 'Посмотреть статистику' },
    { key: 'delete', label: 'Удалить документ' }
    )

}


const onSelect = (option: (typeof LIST_OPTIONS)[0]) => {
  console.log('option', option)
}



const checkSign = async () => {
  const { accessToken } = useAuthStore();

  const check = await axios.get(`${BASE_URL}/post/${props.item.id}`, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${accessToken}`
      }
    });

    // isSigned.value = check.data.data.sign === true;
    // console.log("Статус подписи", isSigned.value)
    const isSigned = check.data.data.sign === true
    signStore.setDocumentStatus(props.item.id, isSigned ? 'success' : 'failed')
    console.log("чтото", check)



}


onMounted(() => {
  checkSign()
})


</script>


<style scoped>

</style>