<script setup lang="ts">
const props = defineProps<{
  checked: boolean;
  text: string;
  id: string;
}>();

const emit = defineEmits<{
  (e: "click", value: string): void;
}>();

const handleClick = (): void => {
  emit("click", props.id);
};
</script>

<template>
  <div
    class="item-center flex rounded-[5px] p-[8px] text-sm hover:cursor-pointer"
    :class="
      checked
        ? 'bg-[#fc3d4c] text-white hover:bg-[#fc3d4c]'
        : 'hover:bg-background-sidebar-hover'
    "
    @click="handleClick"
  >
    {{ text }}
  </div>
</template>

<style scoped></style>
