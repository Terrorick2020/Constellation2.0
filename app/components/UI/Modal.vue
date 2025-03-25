<template>
  <Transition>
    <div v-if="modelValue" class="modal-overlay" @click="closeDialog">
      <div ref="highlight" class="modal-highlight">
        <div class="clickable-area" @click.stop></div>
      </div>

      <el-dialog
        v-model="dialogVisible"
        :class="{ stick: props.targetRef }"
        v-bind="bindAttrs"
        :style="dialogStyle"
        @click.stop
      >
        <template #header>
          <slot name="title"></slot>
        </template>
        <slot></slot>
      </el-dialog>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import type { ModalEmits } from '~/types/UI/modal.ts'
import { ModalProps } from '~/types/UI/modal.js'

const attrs = useAttrs()

const bindAttrs = computed(() => {
  const { modelValue, ...rest } = props
  return { ...rest, ...attrs }
})

defineOptions({
  inheritAttrs: false
})

const props = defineProps(ModalProps)
const emit = defineEmits<ModalEmits>()

const highlight = ref<HTMLElement>()

const dialogVisible = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const closeDialog = () => {
  emit('update:modelValue', false)
}

const windowWidth = ref(0)

const dialogStyle = computed(() => {
  if (!props.targetRef?.$el) return {}
  const width = windowWidth.value

  const rect = props.targetRef.$el.getBoundingClientRect()
  return {
    position: 'fixed',
    top: `${rect.bottom + 5}px`,
    right: `${window.innerWidth - rect.right}px`,
    margin: 0
  }
})

const updateHighlight = () => {
  if (!props.targetRef?.$el || !highlight.value) return

  const rect = props.targetRef.$el.getBoundingClientRect()
  const computedStyle = window.getComputedStyle(props.targetRef.$el)

  highlight.value.style.top = `${rect.top}px`
  highlight.value.style.left = `${rect.left}px`
  highlight.value.style.width = `${rect.width}px`
  highlight.value.style.height = `${rect.height}px`
  highlight.value.style.borderRadius = computedStyle.borderRadius

  const overlay = document.querySelector('.modal-overlay') as HTMLElement
  if (overlay) {
    const x = rect.left + rect.width / 2
    const y = rect.top + rect.height / 2
    const radius = Math.sqrt(Math.pow(rect.width, 2) + Math.pow(rect.height, 2)) / 2

    overlay.style.setProperty('--highlight-x', `${x}px`)
    overlay.style.setProperty('--highlight-y', `${y}px`)
    overlay.style.setProperty('--highlight-radius', `${radius}px`)
  }
}

const updatePosition = () => {
  windowWidth.value = window.innerWidth
  updateHighlight()
}

onMounted(() => {
  windowWidth.value = window.innerWidth
  window.addEventListener('resize', updatePosition)
})

onUnmounted(() => {
  window.removeEventListener('resize', updatePosition)
})

watch(
  () => props.modelValue,
  async (newValue) => {
    if (newValue) {
      await nextTick(() => {
        updateHighlight()
      })
    }
  }
)
</script>
