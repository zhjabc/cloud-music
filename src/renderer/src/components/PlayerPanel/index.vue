<script setup lang="ts">
import { usePlayerStore } from "@/store";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import { computed, ref, watch } from "vue";
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

const playerStore = usePlayerStore();
const playUrl = computed(() => playerStore.currentSong?.url ?? "");
const audioPLayer = useAudioPlayer(playUrl);
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
} = audioPLayer;

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
const volumeValue = ref([volume.value]);

watch(volume, (value) => {
  volumeValue.value = [value];
});

const toggleSong = (n: number) => {
  let currentSonge;
  if (playerStore.playList.length) {
    currentSonge = playerStore.playList[playerStore.currentIndex + n];
    if (!currentSonge) {
      currentSonge =
        playerStore.playList[n > 0 ? 0 : playerStore.playList.length - 1];
    }
    playerStore.setSongInfo("" + currentSonge.id);
  }
};
const showPlayListPanel = ref(false);
const showLyricsPanel = ref(false);
</script>

<template>
  <div
    v-show="playerStore.currentSong"
    class="flex h-[75px] w-full items-center justify-evenly border-t-[0.5px] bg-background-player drop-shadow"
  >
    <div class="flex items-center space-x-2">
      <div
        class="h-16 w-16 cursor-pointer rounded-full bg-[#242424] p-[10px]"
        :class="{ 'animate-spin-5s': isPlaying }"
        @click="showLyricsPanel = true"
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
          @click="toggleSong(-1)"
        />
        <div class="cursor-pointer" @click="handlePlay">
          <pause-one v-if="isPlaying" theme="outline" size="32" />
          <play v-else theme="outline" size="32" />
        </div>
        <go-end
          class="cursor-pointer"
          theme="outline"
          size="24"
          @click="toggleSong(1)"
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
          v-model="volumeValue"
          class="w-[100px]"
          :max="1"
          :step="0.01"
          @update:model-value="(val: number[]) => setVolume(val[0])"
        />
      </div>
    </div>
    <teleport to="body">
      <PlayListPanel v-model:show="showPlayListPanel" />
    </teleport>
    <teleport to="body">
      <PlayerDetailPanel v-model:show="showLyricsPanel" :audio="audioPLayer"
    /></teleport>
  </div>
</template>

<style scoped></style>
