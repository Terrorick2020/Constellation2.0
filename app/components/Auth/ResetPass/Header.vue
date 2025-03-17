<template>
    <div class="sign-in__header">
        <h3 class="title mt-1">
            Восстановление пароля
        </h3>
        <p class="description">
        Мы отправим код для восстановления пароля на вашу почту
        </p>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  step: number,
  email: string,
  basePath: string
}>()
</script>