<script setup lang="ts">
import { checkQrCode, createQrCode, getQrKey } from "@/api/public";
import { QrCode, QrKey } from "@/types";
import { onMounted, onUnmounted, ref } from "vue";
import { useUserInfo } from "@/store";
import Zhj_phone_input from "@/components/zhj_ui/zhj_phone_input.vue";

const emits = defineEmits(["close"]);

onMounted(() => {
  getQrCodeFn();
});

let key = "";
const qrInfo = ref<QrCode>();

const getQrCodeFn = async () => {
  qrCheckTimer && clearTimeout(qrCheckTimer);
  const {
    data: { unikey },
  } = await getQrKey<QrKey>();
  key = unikey;
  const { data } = await createQrCode<QrCode>({
    key,
    qrimg: true,
  });
  qrInfo.value = data;
  checkQrCodeFn();
};

let qrCheckTimer;
const userInfo = useUserInfo();

const checkQrCodeFn = async () => {
  try {
    qrCheckTimer && clearTimeout(qrCheckTimer);

    const res = await checkQrCode({ key });

    // 根据返回码处理不同情况
    if (res.code === 800) {
      // 二维码过期，重新获取
      getQrCodeFn();
    } else if (res.code === 803) {
      // 登录成功
      localStorage.setItem("MUSIC_U", res.cookie);
      await userInfo.setUserInfo();
      closeLoginPanel();
    } else {
      // 其他状态（等待扫码、待确认等），继续轮询
      qrCheckTimer = setTimeout(checkQrCodeFn, 3000);
    }
  } catch (error) {
    // 出错后继续轮询
    qrCheckTimer = setTimeout(checkQrCodeFn, 3000);
  }
};

// 组件卸载或登录面板关闭时清除定时器
onUnmounted(() => {
  qrCheckTimer && clearTimeout(qrCheckTimer);
});

const closeLoginPanel = () => {
  emits("close");
  qrCheckTimer && clearTimeout(qrCheckTimer);
};

const mode = ref("qr");
const toggleLoginMode = (value: string) => {
  mode.value = value;
};

const ctCode = ref("86");
const handleChang = (value: string) => {
  ctCode.value = value;
  console.log("=>(index.vue:76) value", value);
};
</script>

<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center">
    <!-- 半透明背景遮罩，增加深度感 -->
    <div
      class="fixed inset-0 bg-opacity-60 backdrop-blur-sm"
      @click="closeLoginPanel"
    ></div>

    <!-- 登录框 - 添加立体效果 -->
    <div
      class="relative flex h-[520px] w-[377px] scale-100 transform flex-col overflow-hidden rounded-lg border bg-background-login shadow-2xl transition-all duration-300 ease-out"
    >
      <div>
        <!-- 拖动区域 - 顶部栏 -->
        <div
          class="drag-region flex h-[45px] items-center justify-between border-b px-5"
        >
          <div
            v-if="mode === 'phone'"
            class="cursor-pointer font-medium"
            @click="toggleLoginMode('qr')"
          >
            扫码登录
          </div>
          <div v-else></div>
          <div
            class="no-drag cursor-pointer text-gray-500 hover:text-gray-300"
            @click="closeLoginPanel"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </div>
        </div>

        <!-- 内容区 -->
        <div
          v-show="mode === 'qr'"
          class="flex flex-1 flex-col items-center justify-center space-y-6 p-8"
        >
          <!-- 二维码区域 -->
          <div
            class="flex h-[200px] w-[200px] items-center justify-center rounded-lg shadow-inner"
            @dblclick="getQrCodeFn"
          >
            <img :src="qrInfo?.qrimg" class="pointer-events-none" />
          </div>

          <!-- 扫码提示 -->
          <div class="text-center">
            使用<span class="px-[5px] text-[#5a75b2]">网易云APP扫码</span>登录
          </div>

          <!-- 其他登录选项 -->
          <div class="w-full pt-4 text-center">
            <div
              class="cursor-pointer text-sm text-[#5e7cbd]"
              @click="toggleLoginMode('phone')"
            >
              选择其他登录模式
            </div>
          </div>
        </div>
        <div
          v-show="mode === 'phone'"
          class="flex flex-1 flex-col items-center justify-center p-8"
        >
          <div
            class="flex w-full items-center justify-center space-x-[6px] pb-[25px]"
          >
            <span
              class="iconfont icon-wangyiyun text-[38px] text-[#fc3c5a]"
            ></span>
            <span class="text-[25px]">网易云音乐</span>
          </div>
          <zhj_phone_input @change="handleChang" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
