<script setup lang="ts">
import { useRoute } from "vue-router";
import { msToTime } from "@/utils";
import { ref, watch } from "vue";
import { checkMusic, getSearchSong } from "@/api/public";
import { SearchSong, Song } from "@/types";
import { debounce } from "lodash";
import { useScroll } from "@/hooks/useScroll";
import { useToast } from "@/components/ui/toast/use-toast";
import { usePlayerStore } from "@/store";
import { Like } from "@icon-park/vue-next";

const { toast } = useToast();
const route = useRoute();
const playerStore = usePlayerStore();

const searchResult = ref<SearchSong>();

let currentPage = 1;
const limit = 30;

const songsList = ref<Song[]>([]);

const getSongList = async (keywords: string) => {
  const res = await getSearchSong({
    keywords,
    offset: currentPage * limit,
  });
  searchResult.value = res.result;
  songsList.value = [...songsList.value, ...res.result.songs];

  if (currentPage * limit < (searchResult.value?.songCount ?? 0)) {
    currentPage++;
  }
};
const debouncedSearch = debounce(getSongList, 300);
const saveSearchRecords = (value: string) => {
  const records: string[] = JSON.parse(
    localStorage.getItem("searchRecords") ?? "[]",
  );
  const newRecords: string[] = Array.from(new Set([value, ...records]));
  localStorage.setItem("searchRecords", JSON.stringify(newRecords));
};

watch(
  () => [route.query.keywords, route.query._t],
  ([newKeywords]) => {
    currentPage = 0;
    songsList.value = [];
    debouncedSearch(newKeywords as string);
    saveSearchRecords(newKeywords as string);
  },
  { immediate: true },
);

const scrollRef = ref<HTMLElement | null>(null);
useScroll(scrollRef, () => {
  if (currentPage * limit >= (searchResult.value?.songCount ?? 0)) {
    return;
  }
  getSongList(route.query.keywords as string);
});

const handleDbClick = async (item: Song) => {
  const res = await checkMusic({ id: item.id });
  if (res.success) {
    playerStore.setSongInfo("" + item.id);
  } else {
    toast({
      title: res.message,
      variant: "destructive",
      duration: 2000,
    });
  }
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
          <div>
            <div class="line-clamp-1 text-[#5e7cbd]">{{ item.name }}</div>
            <div class="text-foreground-secondary">{{ item.ar[0].name }}</div>
          </div>
        </div>
        <div
          class="line-clamp-1 flex-[2] p-[3px_8px] text-[14px] text-foreground-secondary"
        >
          {{ item.al.name }}
        </div>
        <div class="flex-[1] p-[3px_8px] text-foreground-secondary">
          <like theme="outline" size="20" />
        </div>
        <div class="flex-[1] p-[3px_8px] text-foreground-secondary">
          {{ msToTime(item.dt) }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
