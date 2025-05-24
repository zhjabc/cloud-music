<script setup lang="ts">
import {
  Down,
  GoEnd,
  GoStart,
  Like,
  PauseOne,
  Play,
  PlayCycle,
  VolumeMute,
  VolumeNotice,
} from "@icon-park/vue-next";
import { usePlayerStore } from "@/store";
import { LyricsLine, parseLrc, parseYrc } from "@lrc-player/parse";
import { ref, watch, nextTick } from "vue";
import { msToTime, getColorFromURL } from "@/utils";

const props = defineProps<{
  show: boolean;
  audio: any;
}>();
const emits = defineEmits(["update:show"]);

const playerStore = usePlayerStore();
const parseLrcList = ref<
  {
    time: number;
    text: string;
    index: number;
    duration: number;
    unrender: boolean;
    showTime?: boolean;
  }[]
>();

// 添加歌词容器引用
const lyricsContainer = ref<HTMLDivElement | null>(null);
// 当前活跃的歌词索引
const currentLyricIndex = ref(-1);
// 歌词元素引用
const lyricRefs = ref<HTMLElement[]>([]);

// 动态背景颜色
const primaryColor = ref("#68122e"); // 默认主背景色
const secondaryColor = ref("#2e1017"); // 默认次要背景色

// 当歌曲变化时，提取专辑封面颜色
watch(
  () => playerStore.currentSongDetail?.al?.picUrl,
  (picUrl) => {
    if (picUrl) {
      // 从URL提取颜色（使用之前封装好的工具函数）
      getColorFromURL(picUrl)
        .then((colors) => {
          // 应用提取的颜色
          primaryColor.value = colors.primary;
          secondaryColor.value = colors.secondary;
        })
        .catch((error) => {
          console.error("提取颜色时出错:", error);
        });
    }
  },
  { immediate: true },
);

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
  setCurrentTime,
} = props.audio;

watch(
  () => playerStore.lyric,
  (value) => {
    if (value) {
      parseLrcList.value = parseYrc(value);
      currentLyricIndex.value = -1;
      lyricRefs.value = []; // 重置歌词元素引用数组
    }
  },
  { immediate: true },
);

// 监听当前播放时间，更新当前歌词
watch(
  () => currentTime.value,
  (_) => {
    if (!parseLrcList.value || !sound.value) return;

    // 直接使用音频对象的当前时间（秒）
    const currentTimeSec = sound.value.seek();
    if (!currentTimeSec) return;

    // 查找当前应该显示的歌词
    let foundIndex = -1;
    for (let i = 0; i < parseLrcList.value.length; i++) {
      // 找到最后一个时间小于或等于当前播放时间的歌词
      if (parseLrcList.value[i].time <= currentTimeSec) {
        foundIndex = i;
      } else {
        break;
      }
    }

    if (foundIndex !== currentLyricIndex.value) {
      currentLyricIndex.value = foundIndex;
      // 在下一个渲染循环中滚动到当前歌词
      nextTick(() => {
        scrollToActiveLyric();
      });
    }
  },
  { immediate: true },
);

// 滚动到当前活跃歌词
const scrollToActiveLyric = () => {
  if (
    currentLyricIndex.value < 0 ||
    !lyricsContainer.value ||
    !lyricRefs.value[currentLyricIndex.value]
  )
    return;

  const container = lyricsContainer.value;
  const activeElement = lyricRefs.value[currentLyricIndex.value];

  // 计算滚动位置，使当前歌词在容器中间位置
  const containerHeight = container.clientHeight;
  const elementTop = activeElement.offsetTop;
  const elementHeight = activeElement.clientHeight;

  container.scrollTo({
    top: elementTop - containerHeight / 2 + elementHeight / 2,
    behavior: "smooth",
  });
};

const handlePlayByTime = (time: number) => {
  setCurrentTime(time);
};

const volumeValue = ref([volume.value]);

watch(volume, (value) => {
  volumeValue.value = [value];
});

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
</script>

<template>
  <div
    class="fixed left-0 top-0 z-50 flex h-screen w-full flex-col transition-all duration-1000"
    :style="{
      backgroundColor: primaryColor,
      transform: show ? 'translateY(0)' : 'translateY(100%)',
    }"
  >
    <div class="drag h-[30px] flex-none"></div>
    <div
      class="flex min-h-0 flex-1 items-center justify-center space-x-20 px-[20px] pb-[75px]"
    >
      <div
        class="h-[320px] w-[320px] rounded-full p-[10px] drop-shadow"
        :style="{ backgroundColor: primaryColor }"
      >
        <div
          class="h-full w-full rounded-full bg-[#0c0c0c] p-[50px] transition-all"
          :class="{ 'animate-spin-10s': isPlaying }"
        >
          <img
            class="h-full w-full rounded-full"
            :src="playerStore.currentSongDetail?.al.picUrl"
            alt=""
            crossorigin="anonymous"
          />
        </div>
      </div>
      <div class="flex h-full flex-col overflow-hidden">
        <div class="mb-5 pl-[60px] text-2xl font-bold text-white">
          {{ playerStore.currentSongDetail?.name }}
        </div>
        <div
          ref="lyricsContainer"
          class="no-scrollbar min-h-0 flex-1 space-y-3 overflow-y-auto text-[#cccc]"
        >
          <div
            v-for="(item, index) in parseLrcList"
            :key="item.index"
            :ref="
              (el) => {
                if (el) lyricRefs[index] = el as HTMLElement;
              }
            "
            class="cursor-text transition-all duration-500"
            :class="{
              'text-white': item.showTime || index === currentLyricIndex,
              'font-bold': index === currentLyricIndex,
            }"
            @mouseenter="item.showTime = true"
            @mouseleave="item.showTime = false"
            @click="handlePlayByTime(item.time)"
          >
            <div v-if="item.text">
              <span :class="item.showTime ? 'opacity-100' : 'opacity-0'">{{
                msToTime(item.time * 1000)
              }}</span
              ><span class="pl-5">{{ item.text }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--底部-->
    <div
      class="fixed bottom-0 left-0 flex w-full items-center justify-around bg-black p-5 text-gray-400 opacity-30 transition-all duration-1000"
    >
      <div class="absolute left-5">
        <down
          class="cursor-pointer"
          theme="outline"
          size="28"
          fill="white"
          @click="emits('update:show', false)"
        />
      </div>
      <div class="left">
        <span>
          {{ audio.currentTime }}<span class="mx-1">/</span>{{ audio.duration }}
        </span>
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
      </div>
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
  </div>
</template>

<style scoped>
/* 添加过渡效果 */
.fixed {
  transition:
    transform 0.8s cubic-bezier(0.16, 1, 0.3, 1),
    opacity 0.6s ease;
  will-change: transform, opacity;
}
</style>
