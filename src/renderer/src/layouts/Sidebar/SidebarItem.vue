<script setup lang="ts">
const props = defineProps<{
  checked: boolean;
  text: string;
  id: string;
}>();

const emit = defineEmits<{
  (e: "onClick", value: string): void;
}>();

const handleClick = (): void => {
  emit("onClick", props.id);
};
</script>

<template>
  <div
    class="item-center flex rounded-[5px] p-[8px] hover:cursor-pointer hover:bg-background-sidebar-hover"
    :class="{ 'bg-[#fc3d4c] hover:bg-[#fc3d4c]': checked }"
    @click="handleClick"
  >
    {{ text }}
  </div>
</template>

<style scoped></style>
