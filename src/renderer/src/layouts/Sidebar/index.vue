<script setup lang="ts">
import SidebarItem from "@/layouts/Sidebar/SidebarItem.vue";
import { computed, reactive } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const sidebars = reactive([
  {
    id: "/recommend",
    text: "推荐",
    checked: false,
  },
  {
    id: "/featured",
    text: "精选",
    checked: false,
  },
  {
    id: "/podcast",
    text: "播客",
    checked: false,
  },
  {
    id: "4",
    text: "漫游",
    checked: false,
  },
  {
    id: "/follow",
    text: "关注",
    checked: false,
  },
]);
const myBars = reactive([
  {
    id: "9",
    text: "我喜欢的音乐",
    checked: false,
  },
  {
    id: "10",
    text: "最近播放",
    checked: false,
  },
]);

const allBars = computed(() => {
  return [...sidebars, ...myBars];
});

const handleClick = (id: string): void => {
  allBars.value.forEach((item) => {
    item.checked = item.id === id;
  });
  router.push(id);
};
</script>

<template>
  <div class="h-full w-[200px] bg-background-secondary">
    <div class="drag h-[30px] w-full"></div>
    <div class="flex items-center justify-center space-x-[6px] pb-[20px]">
      <span class="iconfont icon-wangyiyun text-[28px] text-[#fc3c5a]"></span>
      <span class="text-2xl">网易云音乐</span>
    </div>
    <div class="h-full overflow-y-auto p-[0_15px_0_20px] scrollbar">
      <div class="mb-[20px] space-y-[5px]">
        <SidebarItem
          v-for="item in sidebars"
          :key="item.id"
          v-bind="item"
          @on-click="handleClick"
        />
      </div>
      <div class="border-[0.5px]"></div>
      <div class="my">
        <div class="py-[10px] pl-[8px] text-[13px] text-[#76767a]">我的</div>
        <div class="space-y-[5px]">
          <SidebarItem
            v-for="item in myBars"
            :key="item.id"
            v-bind="item"
            @on-click="handleClick"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
