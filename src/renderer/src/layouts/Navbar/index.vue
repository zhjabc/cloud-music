<script setup lang="ts">
import zhj_input from "@/components/zhj_ui/zhj_input.vue";
import { ComponentPublicInstance, ref } from "vue";
import { getHotSearch } from "@/api/public";
import SearchRecord from "@/components/SearchRecord/index.vue";
import { HotDetail } from "@/types";
import { useRouter } from "vue-router";
import LoginPanel from "@/components/LoginPanel/index.vue";
import { Avatar } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { useColorMode } from "@vueuse/core";
import { useUserInfo } from "@/store";
import { Left } from "@icon-park/vue-next";

const router = useRouter();

const searchValue = ref("海阔天空");
const searchRecordRef = ref<ComponentPublicInstance | null>(null);

// 主题切换
const mode = useColorMode();
const toggleTheme = (value: boolean) => {
  mode.value = value ? "dark" : "light";
};

// 输入框文本变化
const handleChange = (value: string): void => {
  // console.log(value);
};

// 输入框搜索
const handleSearch = (value: string) => {
  if (!value) return;
  router.push({
    path: "/searchResult",
    query: { keywords: value, _t: Date.now() },
  });
};
const showSearchRecord = ref(false);
const hots = ref<HotDetail[]>([]);

// 输入框聚焦
const handleFocus = async () => {
  if (!searchValue.value) {
    const res = await getHotSearch();
    hots.value = res.data;
    showSearchRecord.value = true;
  }
};

// 输入框失焦
const handleBlur = (): void => {
  setTimeout(() => {
    if (!searchRecordRef.value?.$el?.contains(document.activeElement)) {
      showSearchRecord.value = false;
    }
  }, 100);
};

// 搜索记录点击
const handleRecordChange = (value: string) => {
  searchValue.value = value;
  showSearchRecord.value = false;
  return handleSearch(value);
};

const showLoginPanel = ref(false);
const userInfo = useUserInfo();

const openLoginPanel = () => {
  showLoginPanel.value = !userInfo.accountInfo;
};
</script>

<template>
  <div class="flex flex-nowrap justify-between p-[28px_30px_10px]">
    <div class="relative">
      <div class="flex items-center space-x-2">
        <left
          theme="outline"
          size="24"
          class="cursor-pointer rounded-lg border-[1px] p-[7px_4px]"
          @click="router.back"
        />
        <zhj_input
          v-model="searchValue"
          @change="handleChange"
          @search="handleSearch"
          @focus="handleFocus"
          @blur="handleBlur"
        />
      </div>
      <SearchRecord
        v-if="showSearchRecord"
        ref="searchRecordRef"
        class="absolute top-[50px] w-full"
        :hots="hots"
        @change="handleRecordChange"
      />
    </div>
    <div class="flex flex-nowrap items-center justify-center space-x-5">
      <div
        class="flex cursor-pointer flex-nowrap items-center space-x-1"
        @click="openLoginPanel"
      >
        <Avatar>
          <AvatarImage
            :src="
              userInfo.accountInfo?.profile?.avatarUrl ??
              'https://github.com/unovue.png'
            "
            alt="@unovue"
          />
        </Avatar>

        <div class="text-nowrap">
          {{ userInfo.accountInfo?.profile?.nickname ?? "未登录" }}
        </div>
      </div>
      <Switch
        :model-value="mode === 'dark'"
        @update:model-value="toggleTheme"
      />
    </div>
  </div>
  <Teleport to="#app">
    <LoginPanel v-if="showLoginPanel" @close="showLoginPanel = false"
  /></Teleport>
</template>

<style scoped></style>
