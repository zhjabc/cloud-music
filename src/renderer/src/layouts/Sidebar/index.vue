<script setup lang="ts">
import SidebarItem from "@/layouts/Sidebar/SidebarItem.vue";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useUserInfo } from "@/store";
import PlayListItem from "@/layouts/Sidebar/PlayListItem.vue";
const router = useRouter();
const sidebars = reactive([
  {
    id: "/recommend",
    text: "推荐",
  },
  {
    id: "/featured",
    text: "精选",
  },
  {
    id: "/podcast",
    text: "播客",
  },
  {
    id: "4",
    text: "漫游",
  },
  {
    id: "/follow",
    text: "关注",
  },
]);
const myBars = reactive([
  {
    id: "9",
    text: "我喜欢的音乐",
  },
  {
    id: "10",
    text: "最近播放",
  },
]);

const checkedId = ref();

const handleClick = (id: string): void => {
  checkedId.value = id;
  router.push(id);
};

const userInfo = useUserInfo();

const handlePlayClick = (id: number) => {
  checkedId.value = id;
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
          :checked="checkedId === item.id"
          v-bind="item"
          @click="handleClick"
        />
      </div>
      <div class="border-[0.5px]"></div>
      <div class="my">
        <div class="py-[10px] pl-[8px] text-[13px] text-[#76767a]">我的</div>
        <div class="space-y-[5px]">
          <SidebarItem
            v-for="item in myBars"
            :key="item.id"
            :checked="checkedId === item.id"
            v-bind="item"
            @click="handleClick"
          />
        </div>
      </div>

      <div class="border-[0.5px]"></div>
      <div class="my">
        <div class="py-[10px] pl-[8px] text-[13px] text-[#76767a]">
          创建的歌单<span class="ml-1">{{
            userInfo.subAccount?.createdPlaylistCount ?? 0
          }}</span>
        </div>
        <div class="space-y-[5px]">
          <PlayListItem
            v-for="item in userInfo.createPlayList"
            :key="item.id"
            :checked="checkedId === item.id"
            :playlist="item"
            @click="handlePlayClick"
          />
        </div>
      </div>

      <div class="border-[0.5px]"></div>
      <div class="my">
        <div class="py-[10px] pl-[8px] text-[13px] text-[#76767a]">
          收藏的歌单<span class="ml-1">{{
            userInfo.subAccount?.subPlaylistCount ?? 0
          }}</span>
        </div>
        <div class="space-y-[5px]">
          <PlayListItem
            v-for="item in userInfo.subscribePlayList"
            :key="item.id"
            :checked="checkedId === item.id"
            :playlist="item"
            @click="handlePlayClick"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
