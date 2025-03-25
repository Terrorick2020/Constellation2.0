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
  email: string,
  basePath: string
}>()
</script>