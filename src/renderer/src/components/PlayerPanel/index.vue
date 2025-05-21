<script setup lang="ts">
import { usePlayerStore } from "@/store";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import { computed, ref } from "vue";
import {
  Play,
  PauseOne,
  GoStart,
  GoEnd,
  Like,
  PlayCycle,
  VolumeNotice,
  VolumeMute,
  MusicList,
} from "@icon-park/vue-next";
import PlayListPanel from "@/components/PlayListPanel/index.vue";

const playerStore = usePlayerStore();
const playUrl = computed(() => playerStore.currentSong?.url ?? "");
const {
  isPlaying,
  sound,
  progress,
  duration,
  currentTime,
  setVolume,
  volume,
  isMute,
  setMute,
} = useAudioPlayer(playUrl);

const handlePlay = () => {
  if (sound.value) {
    if (isPlaying.value) {
      sound.value.pause();
    } else {
      sound.value.play();
    }
  } else {
    playerStore.setSongInfo(
      "" + playerStore.playList[playerStore.currentIndex].id,
    );
  }
};
const value = ref([volume.value]);

const toggleSong = () => {
  let currentSonge;
  if (playerStore.currentIndex >= playerStore.playList.length - 1) {
    currentSonge = playerStore.playList[0];
  } else {
    currentSonge = playerStore.playList[playerStore.currentIndex + 1];
  }
  if (currentSonge) {
    playerStore.setSongInfo("" + currentSonge.id);
  }
};
const showPlayListPanel = ref(false);
</script>

<template>
  <div
    v-show="playerStore.currentSong"
    class="flex h-[75px] w-full items-center justify-evenly overflow-hidden border-t-[0.5px] bg-background-player"
  >
    <div class="flex items-center space-x-2">
      <div
        class="h-16 w-16 rounded-full bg-[#242424] p-[10px]"
        :class="{ 'animate-spin-slow': isPlaying }"
      >
        <img
          class="rounded-full"
          :src="playerStore.currentSongDetail?.al.picUrl"
          alt="海报"
        />
      </div>

      <div class="flex flex-col">
        <div class="space-x-1">
          <span>{{ playerStore.currentSongDetail?.name }}</span>
          <span class="text-foreground-secondary">-</span
          ><span class="text-foreground-secondary">{{
            playerStore.currentSongDetail?.ar[0].name
          }}</span>
        </div>
      </div>
    </div>
    <div class="flex flex-col items-center">
      <div class="flex items-center space-x-5">
        <like class="cursor-pointer" theme="outline" size="24" />
        <go-start
          class="cursor-pointer"
          theme="outline"
          size="24"
          @click="toggleSong"
        />
        <div class="cursor-pointer" @click="handlePlay">
          <pause-one v-if="isPlaying" theme="outline" size="32" />
          <play v-else theme="outline" size="32" />
        </div>
        <go-end
          class="cursor-pointer"
          theme="outline"
          size="24"
          @click="toggleSong"
        />
        <play-cycle theme="outline" size="24" />
      </div>
      <div class="flex items-center space-x-2 text-xs font-medium">
        <span>{{ currentTime }}</span>
        <Progress v-model="progress" class="h-1.5 w-[380px] bg-[#4d4d57]" />
        <span>{{ duration }}</span>
      </div>
    </div>
    <div class="flex space-x-4">
      <music-list
        class="cursor-pointer"
        theme="outline"
        size="24"
        @click="showPlayListPanel = !showPlayListPanel"
      />
      <div class="flex cursor-pointer items-center space-x-3">
        <volume-mute
          v-if="isMute"
          theme="outline"
          size="24"
          @click="() => setMute(false)"
        />
        <volume-notice
          v-else
          theme="outline"
          size="24"
          @click="() => setMute(true)"
        />
        <Slider
          v-model="value"
          class="w-[100px]"
          :max="1"
          :step="0.01"
          @update:model-value="(val: number[]) => setVolume(val[0])"
        />
      </div>
    </div>

    <PlayListPanel
      v-if="showPlayListPanel"
      class="fixed bottom-[100px] right-[10px]"
    />
  </div>
</template>

<style scoped></style>
