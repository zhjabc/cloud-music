<script setup lang="ts">
import { ref } from "vue";
import { getRecommend, getRecommendSongs } from "@/api/recommend";
import { DailySong, Recommend } from "@/types";
import { Carousel, CarouselContent } from "@/components/ui/carousel";
import { usePlayerStore } from "@/store";

const recommendList = ref<Recommend[]>([]);
const songList = ref<DailySong[]>([]);
const getRecommendList = async () => {
  const res = await getRecommend();
  recommendList.value = res.recommend;
};
const getRecommendSongList = async () => {
  const res = await getRecommendSongs();
  songList.value = res.data.dailySongs;
};
getRecommendList();
getRecommendSongList();

const playerStore = usePlayerStore();
const handlePlay = (id: number) => {
  playerStore.setSongInfo("" + id);
};
</script>

<template>
  <div class="flex h-full flex-col">
    <div>
      <div class="mb-1 pl-2 text-lg font-bold">每日精选歌单</div>
      <div v-if="recommendList.length" class="mb-1 w-full px-[70px]">
        <Carousel>
          <CarouselContent class="-ml-1">
            <CarouselItem
              v-for="item in recommendList"
              :key="item.id"
              class="pl-1 md:basis-1/3 lg:basis-1/5"
            >
              <div class="cursor-pointer p-1">
                <img :src="item.picUrl" alt="" class="rounded" />
              </div>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
    <div class="flex min-h-0 flex-1 flex-col">
      <div class="mb-1 pl-2 text-lg font-bold">每日精选歌曲</div>
      <div
        class="flex flex-1 flex-wrap items-center space-y-2 overflow-y-auto pl-2 scrollbar"
      >
        <div
          v-for="item in songList"
          :key="item.id"
          class="min-w-1/2 max-w-1/3 flex w-full cursor-pointer items-center rounded p-2 hover:bg-background-secondary md:w-1/2 lg:w-1/3"
          @dblclick="handlePlay(item.id)"
        >
          <img class="h-[66px] w-[66px] rounded" :src="item.al.picUrl" alt="" />
          <div class="ml-2 text-sm">
            <div>{{ item.name }}</div>
            <div class="text-foreground-secondary">{{ item.ar[0].name }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
