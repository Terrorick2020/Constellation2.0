<template>
    <div class="sign-in__header">
        <h2 class="title mt-1">{{ headersList[ props.step ].title }}</h2>
        <p class="description"
            v-if="headersList[ props.step ].description"
        >
            {{ headersList[ props.step ].description }}
        </p>
    </div>
</template>

<script setup lang="ts">
import { RPContentStep } from '~/types/auth/reset-pass'


const props = defineProps<{
  step: number,
}>()

const headersList = {
    [RPContentStep.EmailStep]: {
        "title": "Восстановление пароля",
        "description": "Мы проверим наличие Вашей регистрации"
    },
    [RPContentStep.CodeStep]: {
        "title": "Восстановление пароля",
        "description": "Мы проверим подлинность вашего ключа"
    },
    [RPContentStep.RewritePassStep]: {
        "title": "Изменение пароля",
    },
    [RPContentStep.FinalStep]: {
        "title": "Пароль изменен",
        "description": "Пароль успешно изменен. Не забудьте сохранить его в надежном месте."
    }
}

const genContent = computed(() => headersList[ props.step ])
</script>