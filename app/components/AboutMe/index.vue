<template>
    <div class="about-me w-full flex flex-col items-center gap-[100px]">
        <header class="header w-full flex justify-between">
            <UILogo />
            <nuxt-link href="/auth/sign-in"><el-button round class="btn-main w-full">Вход/Регистрация</el-button></nuxt-link>
        </header>

        <div class="info w-[110%] flex flex-col justify-center items-center">
            <el-image class="w-full my-img" :src="BGif" />
            <div class="w-[90%] stat">
                <AboutMeStatistic />
            </div>
        </div>

        <div class="carousel w-full">
            <el-carousel :interval="4000" type="card" height="500px">
                <el-carousel-item v-for="(item, index) in bannerMas" :key="index">
                     <el-image :src="item" fit="contain" class="carousel-banner" />
                </el-carousel-item>
            </el-carousel>
        </div>

        <div class="questions w-full">
            <h4>Часто задаваемые вопросы:</h4>
            <AboutMeCollapse />
        </div>
    </div>
</template>

<script setup lang="ts">
import BGif from '~/assets/image/blockchein.gif'
import banner from '~/assets/icons/security-banner.svg?url' 
const bannerMas = [
    banner,
    banner,
    banner,
    banner,
    banner,
    
]

</script>

<style scoped lang="scss">
.about-me {
    width: 100%;

    .header {
        background: #ffffff;
        border: 2px solid rgb(222, 222, 222);
        border-radius: 15px;
        padding: 10px 15px;
    }

    .info {
        width: 110%;
        position: relative;
        padding-bottom: 10%;

        .my-img {
            border-radius: 10px;
        }

        .stat {
            position: absolute;
            bottom: 0;
            background: #99a9bf;
            padding: 10px;
            border-radius: 10px;
        }
    }

    .carousel {
        width: 100%;

        .el-carousel__item h3 {
            color: #475669;
            opacity: 0.75;
            line-height: 200px;
            margin: 0;
            text-align: center;
        }

        .el-carousel__item:nth-child(2n) {
            background-color: #99a9bf;
        }

        .el-carousel__item:nth-child(2n + 1) {
            background-color: #d3dce6;
        }
    }

    .questions {
        width: 100%;

        h4 {
            width: 100%;
            text-align: left;
            font-size: 24px;
            font-weight: 600;
            margin-bottom: 10px;
        }
    }
}
</style>