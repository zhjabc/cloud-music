<script setup lang="ts">
import { useRoute } from "vue-router";
import { msToTime } from "@/utils";
import { ref, watch } from "vue";
import { checkMusic, getSearchSong, getSongUrl } from "@/api/public";
import { SearchSong, Song } from "@/types";
import { debounce } from "lodash";
import { useScroll } from "@/hooks/useScroll";

const route = useRoute();

const searchResult = ref<SearchSong>();

let offset = 0;

const songsList = ref<Song[]>([]);

const getSongList = async (keywords: string) => {
  const res = await getSearchSong<SearchSong>({
    keywords,
    offset,
  });
  searchResult.value = res.result;
  songsList.value.push(...res.result.songs);
  if (offset * 30 < (searchResult.value?.songCount ?? 0)) {
    offset++;
  }
};
const debouncedSearch = debounce(getSongList, 300);

watch(
  () => [route.query.keywords, route.query._t],
  ([newKeywords]) => {
    offset = 0;
    songsList.value = [];
    debouncedSearch(newKeywords as string);
  },
  { immediate: true },
);

const scrollRef = ref<HTMLElement | null>(null);
useScroll(scrollRef, () => {
  if (offset * 30 >= (searchResult.value?.songCount ?? 0)) {
    return;
  }
  getSongList(route.query.keywords as string);
});

const handleDbClick = (item: Song) => {
  // getSongUrl({ id: "" + item.id, level: "standard" });
  checkMusic({ id: item.id });
};
</script>

<template>
  <div class="flex h-full flex-col py-[15px]">
    <div class="mb-[20px] ml-[30px]">
      <span class="text-[26px] font-semibold">{{ route.query.keywords }}</span>
      <span class="ml-[5px] text-[14px] text-foreground-secondary"
        >的相关搜索如下，找到{{ searchResult?.songCount }}首单曲</span
      >
    </div>
    <div
      ref="scrollRef"
      class="ml-[30px] min-h-0 flex-1 overflow-y-auto scrollbar"
    >
      <div
        class="text- flex items-center justify-between rounded-[5px] px-[20px] font-semibold text-foreground-secondary"
      >
        <div class="w-[30px]">#</div>
        <div
          class="flex-[3] rounded-[5px] p-[3px_8px] hover:bg-background-secondary"
        >
          标题
        </div>
        <div
          class="flex-[2] rounded-[5px] p-[3px_8px] hover:bg-background-secondary"
        >
          专辑
        </div>
        <div
          class="flex-[1] rounded-[5px] p-[3px_8px] hover:bg-background-secondary"
        >
          喜欢
        </div>
        <div
          class="flex-[1] rounded-[5px] p-[3px_8px] hover:bg-background-secondary"
        >
          时长
        </div>
      </div>
      <div
        v-for="(item, index) in songsList"
        :key="item.id"
        class="flex items-center justify-between rounded-[10px] px-[20px] text-[15px] hover:bg-background-secondary"
        @dblclick="handleDbClick(item)"
      >
        <div class="w-[30px] text-foreground-secondary">{{ index + 1 }}</div>
        <div class="flex flex-[3] items-center p-[8px]">
          <img
            class="mr-[8px] h-[50px] w-[50px] rounded-lg"
            :src="item.al.picUrl"
          />
          <div class="text-[#5e7cbd]">{{ item.name }}</div>
        </div>
        <div
          class="line-clamp-1 flex-[2] p-[3px_8px] text-[14px] text-foreground-secondary"
        >
          {{ item.al.name }}
        </div>
        <div class="flex-[1] p-[3px_8px] text-foreground-secondary">
          <!--          <like theme="outline" size="24" fill="#333" />-->
        </div>
        <div class="flex-[1] p-[3px_8px] text-foreground-secondary">
          {{ msToTime(item.dt) }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
