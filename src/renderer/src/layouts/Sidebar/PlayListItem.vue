<script setup lang="ts">
import { PlayList } from "@/types";

const props = defineProps<{
  checked?: boolean;
  playlist: PlayList;
}>();

const emit = defineEmits<{
  (e: "click", value: number): void;
}>();

const handleClick = (): void => {
  emit("click", props.playlist.id);
};
</script>

<template>
  <div
    class="item-center flex cursor-pointer space-x-2 rounded-[5px] p-[8px] text-xs"
    :class="
      checked
        ? 'bg-[#fc3d4c] text-white hover:bg-[#fc3d4c]'
        : 'hover:bg-background-sidebar-hover'
    "
    @click="handleClick"
  >
    <img class="h-[32px] w-[32px] rounded" :src="playlist.coverImgUrl" />
    <div class="line-clamp-2">{{ playlist.name }}</div>
  </div>
</template>

<style scoped></style>
