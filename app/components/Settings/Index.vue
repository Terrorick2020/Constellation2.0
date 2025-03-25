<template>
  <div :class="`settings-menu ${isDesktop ? 'border-wrapper' : ''} w-full`">
      <NavBar v-if="isDesktop" class="border-r submenu-block" />
      <NavBarMobile v-else-if="!isTabOpen" class="w-full" />

      <component :is="tabs[path || 'Common']" v-if="isDesktop" class="p-[30px]" />
      <div v-else-if="isTabOpen" class="settings-mobileContent">
          <el-button round class="m-[20px] h-[50px] w-[50px]" @click="() => navigateTo('/settings')">
              <SvgoArrowLeft/>
          </el-button>
          <div class="pl-[20px] pb-[5px] opacity-50 font-bold text-sm">Настройки</div>
          <component :is="tabs[path]" class="p-[20px] pt-[0px]" />
      </div>
  </div>
</template>

<script setup lang="ts">
import Common from './Parts/Common.vue';
import Scope from './Parts/Scope.vue';
import Clients from './Parts/Clients.vue';
import Inventory from './Parts/Inventory.vue';
import NavBar from './NavBar.vue';
import NavBarMobile from './NavBarMobile.vue';

const tabs = {
  Common,
  Scope,
  Clients,
  Inventory,
};

const props = defineProps<{
  path?: string | string[],
}>();

const val = (props.path as string);
const path = typeof props.path === 'string' ? String(val).charAt(0).toUpperCase() + String(val).slice(1) : undefined;

const viewport = useViewport();
const isTabOpen = ref(!!path);
const isDesktop = !viewport.isLessThan('desktop');

// coll-614: Сделать анимацию
</script>