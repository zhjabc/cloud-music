<script setup lang="ts">
const props = defineProps<{
  title: string;
}>();
const emit = defineEmits<{
  (e: "ok"): void;
  (e: "cancel"): void;
}>();
</script>

<template>
  <div
    class="absolute left-[50%] top-[50%] m-auto min-h-[180px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-lg border-[1px] bg-background-secondary p-5 drop-shadow"
  >
    <div class="text-center text-xl font-medium">{{ title }}</div>
    <div></div>
    <div
      class="fixed bottom-5 left-0 flex w-full justify-center space-x-2 text-center"
    >
      <div
        class="w-2/5 cursor-pointer rounded-2xl border-[0.5px] p-[6px] hover:bg-background-sidebar-hover"
        @click="emit('cancel')"
      >
        取消
      </div>
      <div
        class="w-2/5 cursor-pointer rounded-2xl border-[0.5px] bg-[#fc3c57] p-[6px] text-white hover:bg-[#e23551]"
        @click="emit('ok')"
      >
        确定
      </div>
    </div>
  </div>
</template>

<style scoped></style>
