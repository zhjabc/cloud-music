import request from "@/utils/request";
import { LyricResult } from "@/types";

// 心动模式/智能播放列表
export const getPlayList = (sid: string) => {
  return request({
    url: "/playmode/intelligence/list",
    method: "get",
    params: {
      sid,
    },
  });
};

// 获取逐字歌词
export const getLyric = (id: string): Promise<LyricResult> => {
  return request({
    url: "/lyric/new",
    method: "get",
    params: {
      id,
    },
  });
};
