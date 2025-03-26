import { computed } from 'vue';
<template>
    <div class="sign-in__header">
        <h2 class="title mt-1">
            {{ $t( `${ basePath }.header[ ${ props.step } ].title` ) }}
            <span class="font-light" v-if="$te( `${ props.basePath }.header[ ${ props.step } ].titlePostfix` )">
                {{ props.email }}
            </span>
        </h2>
        <p class="description"
            v-if="Object.keys( $tm( `${ props.basePath }.header[ ${ props.step } ].description` ) ).length"    
        >
            {{ $t( `${ props.basePath }.header[ ${ props.step } ].description` ) }}
        </p>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  step: number,
}>()

const headersList = {
    "0": {
        "title": "Восстановление пароля",
        "description": "Мы отправим код для восстановления пароля на вашу почту"
    },
    "1": {
        "title": "Мы отправили код для восстановления на",
        "titlePostfix": "<email>"
    },
    "2": {
        "title": "Придумайте новый пароль"
    },
    "3": {
        "title": "Пароль изменен",
        "description": "Пароль успешно изменен. Не забудьте сохранить его в надежном месте."
    }
}

const genContent = computed(() => headersList[ props.step ])
</script>