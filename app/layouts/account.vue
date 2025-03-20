<template>
    <NuxtLayout name="default">
        <div class="account-layout custom-container flex gap-[30px] lg:pb-[60px] lg:pt-[30px]">
            <NavBar />
            <div class="lg:border-wrapper w-full">
                <slot />
            </div>
        </div>
        <Footer />
    </NuxtLayout>
</template>
