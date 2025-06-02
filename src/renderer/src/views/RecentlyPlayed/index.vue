<script setup lang="ts">
import { msToTime } from "@/utils";
import { Like } from "@icon-park/vue-next";
import { ref } from "vue";
import { getRecentlySong } from "@/api/play";
import { RecentSongItem, Song } from "@/types";
import { checkMusic } from "@/api/public";
import { useToast } from "@/components/ui/toast";
import { usePlayerStore } from "@/store";

const { toast } = useToast();
const playerStore = usePlayerStore();

const songsList = ref<RecentSongItem[]>([]);
const loading = ref(false);

const getSongList = async () => {
  loading.value = true;
  try {
    const res = await getRecentlySong();
    songsList.value = res.data.list;
  } finally {
    loading.value = false;
  }
};

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

const init = () => {
  getSongList();
};
init();
</script>

<template>
  <div class="flex h-full flex-col py-[15px]">
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
        :key="item.playTime"
        class="flex items-center justify-between rounded-[10px] px-[20px] text-[15px] hover:bg-background-secondary"
        @dblclick="handleDbClick(item.data)"
      >
        <div class="w-[30px] text-foreground-secondary">{{ index + 1 }}</div>
        <div class="flex flex-[3] items-center p-[8px]">
          <img
            class="mr-[8px] h-[50px] w-[50px] rounded-lg"
            :src="item.data.al.picUrl"
          />
          <div>
            <div class="line-clamp-1 text-[#5e7cbd]">{{ item.data.name }}</div>
            <div class="text-foreground-secondary">
              {{ item.data.ar[0].name }}
            </div>
          </div>
        </div>
        <div
          class="line-clamp-1 flex-[2] p-[3px_8px] text-[14px] text-foreground-secondary"
        >
          {{ item.data.al.name }}
        </div>
        <div class="flex-[1] p-[3px_8px] text-foreground-secondary">
          <like theme="outline" size="20" />
        </div>
        <div class="flex-[1] p-[3px_8px] text-foreground-secondary">
          {{ msToTime(item.data.dt) }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
