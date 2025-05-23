<script setup lang="ts">
import { usePlayerStore } from "@/store";
import { msToTime } from "@/utils";
import { Delete } from "@icon-park/vue-next";
import { showDialog } from "@/utils/register";
const playerStore = usePlayerStore();

const handleClear = () => {
  showDialog({
    title: "确定要清空列表吗？",
    onOk: () => {
      playerStore.clearPlayList();
    },
  });
};
const handlePlay = (id: number) => {
  playerStore.setSongInfo("" + id);
};
</script>

<template>
  <div
    class="z-10 flex h-[500px] w-[385px] flex-col rounded-xl border-[0.5px] bg-background-player pt-5 drop-shadow"
  >
    <header class="flex items-center justify-between px-5 pb-2">
      <div class="flex">
        <span class="text-lg font-bold">播放列表</span>
        <span class="pl-0.5 pt-0.5 text-sm text-foreground-secondary">{{
          playerStore.playList.length
        }}</span>
      </div>
      <div
        class="cursor-pointer text-sm text-foreground-secondary"
        @click="handleClear"
      >
        <delete theme="outline" size="16" />
        <span>清空</span>
      </div>
    </header>
    <ul class="overflow-y-auto scrollbar">
      <li
        v-for="item in playerStore.playList"
        :key="item.id"
        class="flex w-full cursor-pointer items-center justify-between px-5 py-2 hover:bg-background-search-record-hover"
        @dblclick="handlePlay(item.id)"
      >
        <div class="flex items-center">
          <img class="h-[66px] w-[66px] rounded" :src="item.al.picUrl" alt="" />
          <div class="ml-2">
            <div>{{ item.al.name }}</div>
            <div class="text-sm text-foreground-secondary">
              {{ item.ar[0].name }}
            </div>
          </div>
        </div>
        <div class="text-sm text-foreground-secondary">
          {{ msToTime(item.dt) }}
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
