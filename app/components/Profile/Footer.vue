<template>
  <section class="main-block-wrapper">
    <div class="flex flex-wrap gap-y-[18px] lg:flex-row flex-col text-sm">

      <div class="cursor-pointer flex gap-2 items-center lg:w-1/2">
        <SvgoDownload class="text-2xl" />
        <p>Скачать сводку компании (PDF)</p>
      </div>

      <div class="flex gap-2 items-center lg:w-1/2">
        <SvgoNeye class="text-2xl" />
        <p><strong>{{ profileInfo.views }}</strong> просмотр(a/ов)</p>
      </div>

      <div ref="copyRef" @click="copyUrl" class="cursor-pointer flex gap-2 items-center lg:w-1/2">
        <SvgoUndo class="text-2xl" />
        <div class="flex flex-col">
          <span>Поделиться</span>
          <span class="text-xs opacity-40">
            {{ copiedUrl }}
          </span>
        </div>
      </div>

      <el-popover
        ref="popoverRef"
        placement="top"
        :width="165"
        :virtual-ref="copyRef"
        trigger="click"
        virtual-triggering
      >
        <span>Ссылка скопирована</span>
      </el-popover>
      
      <div class="cursor-pointer flex gap-2 items-center lg:w-1/2">
        <SvgoSlash class="text-2xl" />
        <div class="flex flex-col justify-start">
          <span>Пожаловаться</span>
          <span class="text-xs opacity-40">Аккаунт пользователя проверит модерация</span>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { useProfileStore } from '~/stores/profile'
import { COLLABA_URL } from '~/constants/profile'

const { companyUrl, profileInfo } = useProfileStore()

const copiedUrl: Ref<string> = computed( () => `${COLLABA_URL}${companyUrl}` )

const copyRef = ref()
const popoverRef = ref()

const copyUrl = async () => {
  await navigator.clipboard.writeText(copiedUrl.value)

  unref(popoverRef).popperRef?.delayHide?.(0)

  setTimeout(() => {
    unref(popoverRef)?.hide?.()
  }, 1000)
}
</script>
