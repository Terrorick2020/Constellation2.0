<template>
    <NuxtLayout name="default">
        <div class="auth-layout">
            <section class="box sm:w-[540px] w-[95vw]">
                <AuthMotivation class="color-block fadeDown" />
                <div class="color-block fadeUp">
                    <ElMain>
                        <slot />
                    </ElMain>
                </div>
            </section>
        </div>
    </NuxtLayout>
</template>
