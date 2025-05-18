<script setup lang="ts">
const model = defineModel({
  type: String,
  required: true,
  default: "",
});
const emits = defineEmits(["change", "search", "focus", "blur"]);
const updateModelValue = (value: string): void => {
  model.value = value;
  emits("change", value);
};
</script>

<template>
  <div class="flex items-center rounded-lg border-[1px] p-[4px_10px]">
    <span
      class="iconfont icon-sousuo text-[20px] text-[#717175] hover:cursor-pointer hover:text-[#a7a7a9]"
      @click="() => emits('search', model)"
    ></span>
    <input
      type="text"
      class="m-[0_8px] w-[220px] border-[#2b2b31] bg-transparent text-[14px]"
      :value="model"
      @input="(e) => updateModelValue((e.target as HTMLInputElement).value)"
      @focus="() => emits('focus')"
      @blur="() => emits('blur')"
      @keyup.enter="
        (e) => emits('search', (e.target as HTMLInputElement).value)
      "
    />
    <span
      v-if="model"
      class="iconfont icon-delete text-[#717175] hover:cursor-pointer"
      @click="() => updateModelValue('')"
    ></span>
    <span v-else class="inline-block w-[16px]"></span>
  </div>
</template>

<style scoped></style>
