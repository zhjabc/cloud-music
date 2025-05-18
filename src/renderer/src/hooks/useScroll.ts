import { onMounted, onUnmounted, Ref } from "vue";

export const useScroll = (
  ref: Ref<HTMLElement | null>,
  callback: () => void,
) => {
  onMounted(() => {
    ref.value?.addEventListener("scroll", () => {
      const scrollTop = ref.value?.scrollTop || 0;
      const scrollHeight = ref.value?.scrollHeight || 0;
      const clientHeight = ref.value?.clientHeight || 0;

      if (scrollTop + clientHeight >= scrollHeight) {
        callback();
      }
    });
  });
  onUnmounted(() => {
    ref.value?.removeEventListener("scroll", callback);
  });
};
