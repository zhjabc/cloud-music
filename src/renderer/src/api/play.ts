import request from "@/utils/request";
import { CommonResult, LyricResult, RecentSong } from "@/types";
import { PlaylistDetail } from "@/types/api/playlistDetail";

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

// 获取歌单详情
export const getPlaylistDetail = (id: string): Promise<PlaylistDetail> => {
  return request({
    url: "/playlist/detail",
    method: "get",
    params: {
      id,
    },
  });
};

// 最近播放-歌曲
export const getRecentlySong = (): Promise<CommonResult<RecentSong>> => {
  return request({
    url: "/record/recent/song",
    method: "get",
  });
};
