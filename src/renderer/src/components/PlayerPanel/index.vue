<script setup lang="ts">
import { playAudio } from "@/utils";
import { watch, ref } from "vue";
import { usePlayerStore } from "@/store";
import { Howl } from "howler";

const playerStore = usePlayerStore();
const isPlaying = ref(false);

let sound: Howl | null = null;
watch(
  () => playerStore.currentSong?.url,
  (newVal) => {
    if (newVal) {
      sound = playAudio(newVal);
      isPlaying.value = true;
    }
  },
);
const handlePlay = () => {
  if (isPlaying.value) {
    sound?.pause();
  } else {
    sound?.play();
  }
  isPlaying.value = !isPlaying.value;
};
</script>

<template>
  <div
    v-show="playerStore.currentSong"
    class="flex h-[75px] w-full items-center justify-evenly border-t-[0.5px] bg-background-player"
  >
    <div class="flex items-center space-x-2">
      <img
        class="h-14 w-14 rounded-full"
        :src="playerStore.currentSongDetail.al.picUrl"
        alt="海报"
      />

      <div class="flex flex-col">
        <div class="space-x-1">
          <span>{{ playerStore.currentSongDetail.name }}</span>
          <span class="text-foreground-secondary">-</span
          ><span class="text-foreground-secondary">{{
            playerStore.currentSongDetail.ar[0].name
          }}</span>
        </div>
      </div>
    </div>
    <div class="flex space-x-2">
      <div class="cursor-pointer">收藏</div>
      <div class="cursor-pointer">上一首</div>
      <div class="cursor-pointer" @click="handlePlay">
        {{ isPlaying ? "暂停" : "播放" }}
      </div>
      <div class="cursor-pointer">下一首</div>
      <div class="cursor-pointer">循环</div>
    </div>
    <div class="flex space-x-2">
      <div class="cursor-pointer">歌词查看</div>
      <div class="cursor-pointer">音量调节</div>
    </div>
  </div>
</template>

<style scoped></style>
