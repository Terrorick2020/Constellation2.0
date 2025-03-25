<template>
    
    <UIAuthInput provider="code"
                class="body-email"
                :type="AUTH_INP_TYPE.text"
                :showPassword="false"
                :error="isFInpErr"
                :title="$t( `${ props.basePath }.search[0].title` )"
                :postTitle="undefined" 
                :placeHolder="$t( `${ props.basePath }.search[0].placeholder` )" 
                :svgType="'svgo-info'" 
    />

</template>

<script setup lang="ts">
import { ref, provide } from 'vue'
import { useAuthStore } from '~/stores/auth'
import { AUTH_INP_TYPE } from '~/constants/auth'
import { lenCode } from '~/env/auth.env'


const props = defineProps<{
  basePath: string
}>()

const authStore = useAuthStore()

const code = ref('')

provide( 'code', code )

watch(() => code.value, (newValue) => {
  authStore.fInpErr.value = newValue.length < lenCode

  authStore.code = authStore.fInpErr.value ? '' : newValue
})

const isFInpErr = computed( () => authStore.fInpErr.value )
</script>