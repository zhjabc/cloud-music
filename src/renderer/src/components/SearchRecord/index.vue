<script setup lang="ts">
import { HotDetail } from "@/types";
import { DeleteFive } from "@icon-park/vue-next";
import { showDialog } from "@/utils/register";

defineProps<{
  hots: HotDetail[];
}>();
const emits = defineEmits(["change"]);
const records: string[] = JSON.parse(
  localStorage.getItem("searchRecords") ?? "[]",
);
const handleClear = () => {
  showDialog({
    title: "确定清空全部历史记录吗？",
    onOk: () => {
      localStorage.removeItem("searchRecords");
    },
  });
};
</script>

<template>
  <div
    class="z-10 h-[600px] overflow-y-auto rounded-md border-[1px] bg-background-search-record py-[20px] scrollbar"
    @mousedown.stop.prevent
  >
    <div class="history mb-[25px] px-[10px]">
      <div class="mb-[10px] flex justify-between text-foreground-secondary">
        <div>搜索历史</div>
        <div class="cursor-pointer" @click="handleClear">
          <delete-five theme="outline" size="20" />
        </div>
      </div>
      <div class="flex flex-wrap items-center">
        <span
          v-for="item in records"
          :key="item"
          class="mb-2 mr-2 cursor-pointer text-nowrap rounded-xl border-[0.5px] bg-[#f2f3f4] p-[2px_10px] text-sm text-foreground-secondary"
          @click="() => emits('change', item)"
        >
          {{ item }}
        </span>
      </div>
    </div>
    <div class="hot_search">
      <div class="mb-5 px-[10px]">热搜榜</div>
      <div
        v-for="(item, index) in hots"
        :key="item.searchWord"
        class="flex cursor-pointer items-center py-[10px] text-[15px] hover:bg-background-search-record-hover"
        @click="() => emits('change', item.searchWord)"
      >
        <div
          class="px-[20px] font-bold"
          :class="{ 'text-[#ff3a39]': index < 3 }"
        >
          {{ index + 1 }}
        </div>
        <div class="flex flex-col">
          <div>{{ item.searchWord }}</div>
          <div
            v-if="item.content"
            class="text-[12px] text-foreground-secondary"
          >
            {{ item.content }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
