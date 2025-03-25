<template>
    <div class="text-content mb-5">
        <p class="description">
            {{ $t( `${ props.basePath }.header[ ${ props.step } ].description` ) }}
        </p>
        <h2 class="title mt-1">
            {{ $t( `${ props.basePath }.header[ ${ props.step } ].title` ) }}
            <span class="font-light" v-if="$te( `${ props.basePath }.header[ ${ props.step } ].titlePostfix` )">
                {{ authStore.email }}
            </span>
            {{ 
                $te( `${ props.basePath }.header[ ${ props.step } ].titlePostfix` )
                    ?
                    $t( `${ props.basePath }.header[ ${ props.step } ].titlePostfix` )
                    :
                    ''
            }}
        </h2>
        <p class="description" v-if="$te( `${ props.basePath }.header[ ${ props.step } ].preDescription` )">
            {{ $t( `${ props.basePath }.header[ ${ props.step } ].preDescription` ) }}
        </p>
    </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'

const props = defineProps<{
    step: number,
    basePath: string
}>()

const authStore = useAuthStore()
</script>