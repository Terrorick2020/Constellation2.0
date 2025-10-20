<template>
  <div class="z-10 flex h-full w-full flex-col bg-main pb-[81px] lg:bg-transparent lg:pb-0">
    <div class="flex items-center justify-between border-b px-5 py-3">
      <button @click="closeChat" class="lg:hidden">
        <SvgoArrowLeft class="h-6 w-6" :font-controlled="false" />
      </button>

      <div v-if="isSearching" class="flex-1 mx-4 flex items-center gap-2">
        <input
          v-model="searchQuery"
          ref="searchInput"
          type="text"
          placeholder="Поиск по сообщениям..."
          class="w-full px-3 py-1.5 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          @input="onSearchInput"
        />
        <button @click="cancelSearch" class="text-gray-500 hover:text-gray-700">×</button>
      </div>

      <div v-else class="flex-1 flex flex-col items-center">
        <div class="font-semibold text-black">
          {{ props.selectedChat?.label || 'Выберите чат' }}
        </div>
        <div class="text-sm text-gray-400">Онлайн</div>
      </div>

      <div class="flex items-center gap-x-[10px]">
        <UIPopoverMenu :list="LIST_OPTIONS" @select="onHeaderSelect">
          <template #reference>
            <button>
              <SvgoMoreVertical class="h-6 w-6" :font-controlled="false" />
            </button>
          </template>
        </UIPopoverMenu>
        <el-avatar
          :src="props.selectedChat?.avatar || Avatar"
          class="h-[44px] w-[44px] rounded-full"
        >
          <template #fallback>photo</template>
        </el-avatar>
      </div>
    </div>

    <ChatsMessagesList :search-query="searchQuery" />

    <div>
      <div class="border-t p-4">
        <div class="text-sm font-extrabold text-black">
          Максимум 1280 символов.
          <span class="text-[#E44820]">Осталось {{ charsLeft }}</span>
        </div>
      </div>
      <div class="border-t p-4">
        <div class="text-sm text-gray-500">
          {{ status }}
        </div>
      </div>
      <ChatsMessagesSendMessage
        v-model="inputMessage"
        :selected-chat="props.selectedChat"
        :sending="sending"
        @send="handleSendMessage"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
// import Avatar from '@/assets/image/avatar.jpg'
import Avatar from '@/assets/image/avatar1.png'
import { ref, computed, nextTick } from 'vue'
import { sendMessage } from '~/stores/chats/sendMessage'
import { sendFileMessage } from '~/stores/chats/sendFile'
import { useAuthStore } from '~/stores/auth'
import { useChatMessagesStore } from '~/stores/chats/messages'
import { useRouter } from 'vue-router'
import { sendMessage as sendViaSocket } from '~/utils/sockets'
import { ElMessage } from 'element-plus' 


const props = defineProps<{
  selectedChat: any
}>()

const authStore = useAuthStore()
const chatMessagesStore = useChatMessagesStore()
const router = useRouter()

const inputMessage = ref('')
const status = ref('')
const sending = ref(false)
const MAX_LENGTH = 1280
const charsLeft = computed(() => MAX_LENGTH - inputMessage.value.length)

const handleSendMessage = async (payload: { text: string; file?: File }) => {
  if (!props.selectedChat) return

  sending.value = true
  status.value = payload.file ? 'Отправка файла...' : 'Отправка...'

  try {
    const chatId = props.selectedChat.id.toString()

    if (payload.file) {
      const result = await sendFileMessage(chatId, payload.file, payload.text);
      console.log(result)
      if (result.success) {
        // chatMessagesStore.addMessage(
        //   payload.text || '[Файл]',
        //   true,
        //   Date.now(),
        //   {
        //     media_url: result.data.media_url,
        //     media_type: result.data.media_type,
        //     fileName: payload.file.name
        //   }
        // )
        // status.value = 'Файл отправлен'
      } else {
        // status.value = 'Ошибка отправки файла'
        // console.error(result.error)
      }
    } else {
      const result = await sendViaSocket(chatId, payload.text)
      console.log('Ответ от сервера на отправку сообщения:', result)
      // chatMessagesStore.addMessage(payload.text, true, Date.now())

      status.value = 'Сообщение отправлено'
      console.log("Сообщение отправлено", result)

    }
  } catch (error) {
    status.value = 'Ошибка'
    console.error(error)
  } finally {
    sending.value = false
  }

  setTimeout(() => {
    status.value = ''
  }, 3000)
}

const isSearching = ref(false)
const searchQuery = ref('')
const searchInput = ref<HTMLInputElement | null>(null)  

const onHeaderSelect = (option: any) => {
  if (option.key === 'profile' && props.selectedChat) {
    router.push(`/profiles/${props.selectedChat.userId}`)
  } else if (option.key === 'search') {
    startSearch()
  } else if (option.key === 'report') {
    ElMessage.success({
      message: 'Жалоба отправлена',
      duration: 2000,
      showClose: true
    })
  } else if (option.key === 'block') {
    ElMessage.warning({
      message: 'Запрос на блокировку отправлен администратору',
      duration: 3000,
      showClose: true
    })
  }
}

const startSearch = () => {
  isSearching.value = true
  searchQuery.value = ''
  nextTick(() => {
    setTimeout(() => {
      searchInput.value?.focus()
    }, 100)
  })
}

const cancelSearch = () => {
  isSearching.value = false
  searchQuery.value = ''
}

const onSearchInput = () => {
}

const closeChat = () => {
  console.log('Закрыть чат')
}

const LIST_OPTIONS = [
  { key: 'profile', label: 'Перейти в профиль', icon: 'personOutline' },
  { key: 'search', label: 'Поиск', icon: 'search' },
  { key: 'report', label: 'Пожаловаться', icon: 'flagOutline' },
  { key: 'block', label: 'Заблокировать', icon: 'closeCircleOutline' }
]
</script> 



