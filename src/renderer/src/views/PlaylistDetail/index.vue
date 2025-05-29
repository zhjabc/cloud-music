<script setup lang="ts">
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import { getPlaylistDetail } from "@/api/play";
import { Playlist, Track } from "@/types/api/playlistDetail";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import dayjs from "dayjs";
import { msToTime } from "@/utils";
import { Like } from "@icon-park/vue-next";
import { Song } from "@/types";
import { checkMusic } from "@/api/public";
import { useToast } from "@/components/ui/toast";
import { usePlayerStore } from "@/store";
const route = useRoute();

const { toast } = useToast();
const playerStore = usePlayerStore();

const playlistDetail = ref<Playlist>();

const init = async (id: string) => {
  const res = await getPlaylistDetail(id);
  playlistDetail.value = res.playlist;
};

watch(
  () => route.params.id,
  (id) => {
    init(id as string);
  },
  { immediate: true },
);

const handleDbClick = async (item: Track) => {
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
  <div class="flex h-full w-full flex-col py-[10px] pl-[30px]">
    <div class="flex h-[168px] items-center">
      <img
        class="h-[168px] w-[168px] rounded-lg"
        :src="playlistDetail?.coverImgUrl"
        alt=""
      />
      <div class="ml-5 flex h-full flex-col justify-between">
        <div>
          <div class="mb-1 text-2xl">{{ playlistDetail?.name }}</div>
          <div class="flex items-center space-x-1">
            <Avatar class="h-8 w-8">
              <AvatarImage
                :src="playlistDetail?.creator.avatarUrl"
                alt="creator"
              />
            </Avatar>
            <span>{{ playlistDetail?.creator.nickname }}</span>
            <span>{{
              dayjs(playlistDetail?.createTime).format("YYYY-MM-DD")
            }}</span>
          </div>
        </div>
        <div class="space-x-2">
          <Button class="bg-[#fc3d4b]">播放全部</Button>
          <Button>下载</Button>
          <Button>...</Button>
        </div>
      </div>
    </div>
    <div class="mt-5 flex min-h-0 flex-1 flex-col">
      <div class="mb-2 space-x-3 text-lg font-medium">
        <span
          >歌曲<span class="text-sm">{{
            playlistDetail?.tracks.length
          }}</span></span
        >
        <span class="text-foreground-secondary">评论</span>
        <span class="text-foreground-secondary">收藏者</span>
      </div>
      <div class="min-h-0 flex-1 overflow-y-auto text-sm scrollbar">
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
          v-for="(item, index) in playlistDetail?.tracks"
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
  </div>
</template>

<style scoped></style>
