<template>
  <div class="z-10 flex h-full w-full flex-col bg-main pb-[81px] lg:bg-transparent lg:pb-0">
    <!-- chat header -->
    <ChatsMessagesHeader />

    <!-- list messages -->
    <ChatsMessagesList />

    <!-- send message -->
    <div>
      <div class="border-t p-4">
        <div class="text-sm font-extrabold text-black">
          Максимум 1280 символов. <span class="text-[#E44820]">Осталось 50</span>
        </div>
      </div>
      <ChatsMessagesSendMessage v-model="inputMessage" @send="handleSendMessage" />
    </div>
  </div>
</template>

<script setup lang="ts">
const inputMessage = ref('')

const handleSendMessage = () => {
  console.log('отправляем сообщение...')
  inputMessage.value = ''
}
</script>
