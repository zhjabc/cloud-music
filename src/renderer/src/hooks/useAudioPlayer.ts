import { computed, Ref, ref, watch } from "vue";
import { Howl } from "howler";
import { msToTime } from "@/utils";

export const useAudioPlayer = (src: Ref<string>) => {
  const sound = ref<Howl>();
  const isPlaying = ref(false);
  const isMute = ref(false);
  const duration = ref(0);
  const currentTime = ref(0);
  const volume = ref(0.5);
  const preVolume = ref(0.5); // 记录上一个音量值

  // 使用计算属性计算进度百分比
  const progress = computed(() => {
    if (!sound.value || !duration.value) return 0;
    return (currentTime.value / duration.value) * 100;
  });

  const formatDuration = computed(() => msToTime(duration.value * 1000));
  const formatCurrentTime = computed(() => msToTime(currentTime.value * 1000));

  // 添加定时器更新当前播放时间
  let timer: NodeJS.Timeout;
  const startTimer = () => {
    timer = setInterval(() => {
      if (sound.value && isPlaying.value) {
        currentTime.value = sound.value.seek() as number;
      }
    }, 1000); // 每秒更新一次
  };

  const stopTimer = () => {
    timer && clearInterval(timer);
  };

  const onplay = () => {
    isPlaying.value = true;
    startTimer(); // 开始播放时启动定时器
  };

  const onpause = () => {
    isPlaying.value = false;
    stopTimer(); // 暂停时停止定时器
  };

  const onend = () => {
    isPlaying.value = false;
    stopTimer(); // 结束时停止定时器
    currentTime.value = 0; // 重置当前时间
  };

  const onload = () => {
    if (sound.value) {
      duration.value = sound.value.duration();
    }
  };

  // 添加音量控制方法
  const setVolume = (value: number) => {
    const newVolume = Math.max(0, Math.min(1, value)); // 确保音量在 0-1 之间
    volume.value = newVolume;
    if (sound.value) {
      sound.value.volume(newVolume);
    }
  };

  const setMute = (value: boolean) => {
    if (value) {
      preVolume.value = volume.value;
      setVolume(0); // 设置静音
    } else {
      setVolume(preVolume.value); // 恢复之前的音量
    }
    isMute.value = value;
  };

  watch(
    src,
    (newVal) => {
      if (newVal) {
        // 清理之前的定时器
        stopTimer();

        if (sound.value) {
          currentTime.value = 0;
          sound.value.stop();
          sound.value.unload();
        }

        sound.value = new Howl({
          src: [newVal],
          autoplay: true,
          html5: true,
          volume: volume.value, // 设置初始音量
          onplay,
          onpause,
          onend,
          onload,
        });
      }
    },
    { immediate: false },
  );

  return {
    isPlaying,
    progress,
    sound,
    duration: formatDuration,
    currentTime: formatCurrentTime,
    volume,
    setVolume,
    isMute,
    setMute,
  };
};
