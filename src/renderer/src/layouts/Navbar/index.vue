<script setup lang="ts">
import zhj_input from "@/components/zhj_ui/zhj_input.vue";
import { ComponentPublicInstance, computed, ref } from "vue";
import { getHotSearch } from "@/api/public";
import SearchRecord from "@/components/SearchRecord/index.vue";
import { HotSearch } from "@/types";
import { useRouter } from "vue-router";
import LoginPanel from "@/components/LoginPanel/index.vue";
import { Avatar } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { useColorMode } from "@vueuse/core";
import { useUserInfo } from "@/store";

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
const hots = ref<HotSearch["hots"]>([]);

// 输入框聚焦
const handleFocus = async () => {
  if (!searchValue.value) {
    const res = await getHotSearch<HotSearch>();
    hots.value = res.result.hots;
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

const showLoginPanel = ref(false);
const userInfo = useUserInfo();

const openLoginPanel = () => {
  showLoginPanel.value = !userInfo.accountInfo;
};
</script>

<template>
  <div class="flex justify-between p-[28px_30px_10px]">
    <div class="relative">
      <zhj_input
        v-model="searchValue"
        @change="handleChange"
        @search="handleSearch"
        @focus="handleFocus"
        @blur="handleBlur"
      />
      <SearchRecord
        v-show="showSearchRecord"
        ref="searchRecordRef"
        class="absolute top-[50px] w-full"
        :hots="hots"
      />
    </div>
    <div class="flex items-center justify-center space-x-5">
      <div
        class="flex cursor-pointer items-center space-x-1"
        @click="openLoginPanel"
      >
        <Avatar>
          <AvatarImage
            :src="
              userInfo.accountInfo?.profile.avatarUrl ??
              'https://github.com/unovue.png'
            "
            alt="@unovue"
          />
        </Avatar>

        <div>{{ userInfo.accountInfo?.profile.nickname ?? "未登录" }}</div>
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
