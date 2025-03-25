<template>
    <el-form class="flex min-h-[600px] w-full flex-col">
        <span class="settings-title">Профиль</span>
        <span class="font-bold pb-[10px]">Название*</span>
        <el-form-item prop="common.name" label-width="16" label-position="top" hide-require-asterisk>
            <el-input size="large" v-model="store.common.name"/>
        </el-form-item>
         
        <span class="font-bold">URL профиля*</span>
        <el-form-item prop="common.url" label="Ссылка на ваш профиль Collaba" label-width="16" label-position="top" hide-require-asterisk>
            <el-input
                size="large"
                v-model="store.common.url"
                :formatter="urlFormatter"
                :parser="urlParser"
            />
        </el-form-item>

        <span class="font-bold">ГЕО</span>
        <el-form-item prop="common.location" label="Где находится Ваш бизнес?" label-width="16" label-position="top" hide-require-asterisk>
            <GeoSelect v-bind:value="store.common.geo"/>
            <SwitchSelect label="Вся Россия" v-bind:value="store.common.wholeRussia"/>
            <SwitchSelect label="Не отображать адрес" v-bind:value="store.common.hideAddress"/>
        </el-form-item>

        <span class="font-bold">Дескриптор</span>
        <el-form-item prop="common.descritor" label="Магазин, барбершоп, цветочный салон, школа музыки или как вы себя идентифицируете" label-width="16" label-position="top" hide-require-asterisk>
            <el-input placeholder="Введите дескриптор..." size="large" v-model="store.common.descritor"/>
            <div class="text-xs mt-[10px]">
                <span class="opacity-40">Осталось символов: </span>
                <span class="font-bold">{{ descriptorWidth }}</span>
            </div>
        </el-form-item>

        <span class="font-bold pb-[10px]">Описание компании</span>
        <el-form-item prop="common.description" label-width="16" label-position="top" hide-require-asterisk>
            <el-input type="textarea" placeholder="Введите описание..." size="large" v-model="store.common.description"/>
            <div class="text-xs mt-[10px]">
                <span class="opacity-40">Осталось символов: </span>
                <span class="font-bold">{{ descriptionWidth }}</span>
            </div>
        </el-form-item>

        <span class="font-bold pb-[10px]">Сайт компании</span>
        <el-form-item prop="common.site" label-width="16" label-position="top" hide-require-asterisk>
            <el-input size="large" placeholder="Вставьте ссылку..." v-model="store.common.site"/>
        </el-form-item>

        <div class="flex flex-col">
            <div class="settings-logo-infoWrapper">
                <div class="flex flex-col">
                    <span class="font-bold mb-[5px]">Логотип</span>
                    <span class="text-xs opacity-40">Рекомендуемый размер 512х512px.</span>
                    <span class="text-xs opacity-40">Доступные форматы: png, jpeg.</span>
                </div>
                <div class="h-[72px] w-[72px] mt-[-10px]">
                    <img :src="store.common.logo"/>
                </div>
            </div>
            <el-form-item prop="common.logo" label="" label-width="16" label-position="top" hide-require-asterisk>
                <el-upload class="settings-logo-uploader" round size="large" v-model="store.common.logo">
                    <el-button    
                        class="btn-grey w-full cursor-pointer"
                        round
                    >               
                        <el-icon class="settings-uploader-icon"><svgo-upload color="black" /></el-icon>
                        Загрузить
                    </el-button>
                </el-upload>
            </el-form-item>
        </div>
        

        <span class="font-bold">Фото и видео</span>
        <el-form-item prop="common.media" label="Доступные форматы: mp4." label-width="16" label-position="top" hide-require-asterisk>
            <el-upload
                v-bind:class="`settings-media-uploader ${store.common.media.length < MAX_MEDIA_COUNT ? '' : 'settings-media-uploader--fulled'}`"
                v-bind:file-list="store.common.media"
                action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                list-type="picture-card"
                :on-preview="handleMediaPreview"
                :on-remove="handleMediaRemove"
                :on-success="handleMediaSuccess"
                :before-upload="beforeMediaUpload"
            >
                <el-icon class="settings-media-uploaderIcon"><Plus /></el-icon>
            </el-upload>

            <el-dialog v-model="dialogVisible">
                <img w-full :src="dialogImageUrl" alt="Preview Image" />
            </el-dialog>
        </el-form-item>

        <el-button round class="btn-main">Сохранить</el-button>
    </el-form>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import type { UploadProps } from 'element-plus'
import { useSettingsStore } from '~/stores/settings'
import { MAX_DESCRIPTOR_WIDTH, MAX_DESCRIPTION_WIDTH, URL_PREFIX, MAX_MEDIA_COUNT } from '~/constants/settings'

const store = useSettingsStore()
const dialogImageUrl = ref('')
const dialogVisible = ref(false)

const urlFormatter = (value: string) => URL_PREFIX.includes(value) ? URL_PREFIX : `${URL_PREFIX}${urlParser(value)}`;
const urlParser = (value: string) => value.replace(/(collaba\.pro\/u\/)\s?/g, '');

const descriptorWidth = ref(MAX_DESCRIPTOR_WIDTH - store.common.descritor.length);
const descriptionWidth = ref(MAX_DESCRIPTION_WIDTH - store.common.description.length);

const handleMediaSuccess: UploadProps['onSuccess'] = (
  response,
  uploadFile
) => {
  store.common.media = [...store.common.media, {
    name: uploadFile.name,
    url: URL.createObjectURL(uploadFile.raw!)
  }]
}

const beforeMediaUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type !== 'image/jpeg') {
    ElMessage.error('Avatar picture must be JPG format!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!')
    return false
  }
  return true
}

const handleMediaRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
  store.common.media = uploadFiles;
}

const handleMediaPreview: UploadProps['onPreview'] = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url!
  dialogVisible.value = true
}

</script>
