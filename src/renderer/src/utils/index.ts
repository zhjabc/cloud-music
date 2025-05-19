import { Howl } from "howler";

export function msToTime(ms: number) {
  const totalSeconds = Math.floor(ms / 1000); // 毫秒 → 秒（取整）
  const minutes = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (totalSeconds % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

let sound: Howl | null = null;
export function playAudio(src: string) {
  if (sound) {
    sound.unload();
  }
  sound = new Howl({
    src: [src],
    autoplay: true,
    html5: true,
  });
  return sound;
}
