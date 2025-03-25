<template>
  //TODO: когда будет логика подбора рекомендаций, поключить её в эту секцию.
  //      Для тестов убираю этот блок!
  <section v-if="false" class="main-block-wrapper">
    <h2 class="text-2xl font-bold mb-5">Похожие компании</h2>
    <div class="flex lg:flex-row flex-col flex-wrap gap-x-[30px] gap-y-5">
      <Company v-for="el in 5" class="lg:w-[45%]" />
    </div>
  </section>
</template>
