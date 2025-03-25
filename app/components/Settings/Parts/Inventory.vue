<template>
    <el-form class="flex min-h-[600px] w-full flex-col">
        <span class="settings-title mb-[10px]">Рекламный инвентарь</span>
        <span class="settings-subtitle">Какой вид рекламы вы готовы обсуждать с партнерами</span>

        

        <el-button round class="btn-main">Сохранить</el-button>
    </el-form>
</template>

<script lang="ts" setup>
import { useSettingsStore } from '~/stores/settings'

const store = useSettingsStore()

</script>
