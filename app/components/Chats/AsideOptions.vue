<template>
  <UIPopoverMenu :list="computedList" @select="onSelect">
    <template #reference>
      <button :class="$attrs['class']" @click.stop="optionsVisible = !optionsVisible">
        <SvgoMoreSmall class="size-4 stroke-[#E44820] stroke-2" :font-controlled="false" />
      </button>
    </template>
  </UIPopoverMenu>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { usePinnedChatsStore } from '~/stores/chats/pinned'
import { useArchivedChatsStore } from '~/stores/chats/archive'

const props = defineProps<{
  chat: any
}>()

const pinnedStore = usePinnedChatsStore()
const archiveStore = useArchivedChatsStore()
const optionsVisible = ref(false)

const computedList = computed(() => [
  { key: 'pin', label: props.chat.pinned ? 'Открепить' : 'Закрепить', icon: 'pinOutline' },
  { key: 'archive', label: props.chat.archived ? 'Восстановить' : 'Архивировать', icon: 'archive' }
])

const onSelect = (option: any) => {
  if (option.key === 'pin') {
    pinnedStore.togglePin(props.chat)
  } else if (option.key === 'archive') {
    archiveStore.toggleArchive(props.chat)
  }
}
</script>