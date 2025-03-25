<template>
  <div class="absolute left-0 right-0 top-[84px] z-10 hidden px-5 lg:block">
    <div class="rounded-2xl border border-gray-200 bg-white px-5 py-[15px]">
      <el-steps class="h-full w-full" :active="2">
        <el-step>
          <template #icon>
            <div
              class="h-[18px] w-[18px] rounded-full border-[3px] border-orange-woman bg-transparent"
            ></div>
          </template>
        </el-step>
        <!-- current -->
        <el-step class="current">
          <template #icon>
            <div
              class="flex h-full items-center rounded-full border-[3px] border-orange-woman bg-orange-woman px-3"
            >
              <div class="text-xs font-extrabold tracking-tight text-white">Договариваемся</div>
            </div>
          </template>
        </el-step>
        <el-step>
          <template #icon>
            <div
              class="h-[18px] w-[18px] rounded-full border-[3px] border-gray-200 bg-transparent"
            ></div>
          </template>
        </el-step>
        <el-step>
          <template #icon>
            <div
              class="h-[18px] w-[18px] rounded-full border-[3px] border-gray-200 bg-transparent"
            ></div>
          </template>
        </el-step>
      </el-steps>
    </div>
  </div>
</template>
