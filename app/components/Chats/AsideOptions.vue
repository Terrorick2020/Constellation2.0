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
  chat: { id: string | number }
}>()

const pinnedStore = usePinnedChatsStore()
const archiveStore = useArchivedChatsStore()
const optionsVisible = ref(false)

const isPinned = computed(() => pinnedStore.isPinned(props.chat.id))
const isArchived = computed(() => archiveStore.isArchived(props.chat.id))

const computedList = computed(() => [
  {
    key: 'pin',
    label: isPinned.value ? 'Открепить' : 'Закрепить',
    icon: 'pinOutline'
  },
  {
    key: 'archive',
    label: isArchived.value ? 'Восстановить' : 'Архивировать',
    icon: 'archive'
  }
])

const onSelect = (option: any) => {
  if (option.key === 'pin') {
    pinnedStore.togglePin(props.chat.id)
  } else if (option.key === 'archive') {
    archiveStore.toggleArchive(props.chat.id) 
  }
}

</script>


