<script setup lang="ts">
import { HotSearch } from "@/types";
defineProps<{
  hots: HotSearch["hots"];
}>();
</script>

<template>
  <div
    class="rounded-md bg-[#2d2d38] py-[20px] text-[#818187]"
    @mousedown.stop.prevent
  >
    <div class="history mb-[30px] px-[10px]">
      <div class="mb-[10px] flex justify-between">
        <div>搜索历史</div>
        <div>删除</div>
      </div>
      <span
        class="rounded-xl border-[0.5px] border-[#45454f] bg-[#393944] p-[2px_10px] text-[14px] text-[#a6a6aa]"
      >
        历史搜索
      </span>
    </div>
    <div class="hot_search">
      <div class="mb-5 px-[10px]">热搜榜</div>
      <div
        v-for="(item, index) in hots"
        :key="item.first"
        class="flex cursor-pointer items-center py-[10px] text-[15px] hover:bg-[#393944]"
      >
        <div class="px-[20px]" :class="{ 'text-[#ff3a39]': index < 3 }">
          {{ index + 1 }}
        </div>
        <div class="flex flex-col">
          <div class="text-[#fff]">{{ item.first }}</div>
          <div v-if="item.third" class="text-[12px]">{{ item.third }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
