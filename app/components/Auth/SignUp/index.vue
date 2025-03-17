<template>
    <div class="w-full">
        <el-container v-loading="settingsStore.isLoad">
            <el-header style="padding: 0; margin: 0;">
                <AuthSignUpHeader />
            </el-header>
            <el-main style="padding: 0; margin: 0; margin-top: 1.5rem;">
                <AuthSignUpBody
                    :userNameErr="userNameErr"
                    :setUserNameErr="setUserNameErr"
                    :passErr="passErr"
                    :setPassErr="setPassErr"
                    :repassErr="repassErr"
                    :setRepassErr="setRepassErr"
                />
            </el-main>
            <el-footer style="padding: 0; margin: 0;  margin-block: 1.5rem 4rem;">
                <AuthSignUpBtns
                    :setUserNameErr="setUserNameErr"
                    :setPassErr="setPassErr"
                />
            </el-footer>
        </el-container>
    </div>
</template>

<script setup lang="ts">
import { useSettingsStore } from '~/store/settings'

const settingsStore = useSettingsStore()

const userNameErr = ref<boolean>( false )
const setUserNameErr = ( value: boolean ) => {
    userNameErr.value = value
}

const passErr = ref<boolean>( false )
const setPassErr = ( value: boolean ) => {
    passErr.value = value
}

const repassErr = ref<boolean>( false )
const setRepassErr = ( value: boolean ) => {
    repassErr.value = value
}
</script>