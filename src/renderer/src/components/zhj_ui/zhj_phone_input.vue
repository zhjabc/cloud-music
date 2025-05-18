<script setup lang="ts">
import { ref } from "vue";

const emits = defineEmits(["change"]);

const current = ref("86");
const showCtPanel = ref(false);

const ctCodeList = [
  { label: "中国大陆", value: "86" },
  { label: "香港", value: "852" },
  { label: "澳门", value: "853" },
  { label: "台湾", value: "886" },
  { label: "美国", value: "1" },
  { label: "新加坡", value: "65" },
  { label: "日本", value: "81" },
];
const handleClick = (value: string) => {
  current.value = value;
  showCtPanel.value = false;
  emits("change", value);
};
</script>

<template>
  <div class="relative">
    <div
      class="flex items-center justify-center space-x-[18px] rounded-[50px] border-[1px] bg-[#22222b] p-[8px_20px] text-[14px]"
    >
      <div
        class="flex w-14 cursor-pointer justify-between"
        @click="showCtPanel = !showCtPanel"
      >
        <div>+{{ current }}</div>
        <div>⬇️</div>
      </div>
      <div class="h-[16px] border-[0.5px] border-[#4b4b52]" />
      <input placeholder="请输入手机号" class="bg-transparent" />
    </div>
    <ul
      v-if="showCtPanel"
      class="absolute top-[45px] h-[300px] w-full overflow-y-auto rounded-lg border-[1px] border-[#42424c] bg-[#2d2d38] py-[3px] scrollbar scrollbar-thumb-[#42424c]"
    >
      <li
        v-for="item in ctCodeList"
        :key="item.value"
        class="flex cursor-pointer justify-between px-8 py-2 text-[14px] text-[#c5c5c7] hover:bg-[#393944]"
        @click="() => handleClick(item.value)"
      >
        <div>{{ item.label }}</div>
        <div>+{{ item.value }}</div>
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
