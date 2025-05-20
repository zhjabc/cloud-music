import request from "@/utils/request";
import {
  CommonResult,
  HotDetail,
  QrCheck,
  Result,
  SearchSong,
  SongDetail,
  SongLevel,
  SongUrl,
} from "@/types";

// 搜索歌曲
export const getSearchSong = (params: {
  keywords: string;
  limit?: number;
  type?: number;
  offset?: number;
}): Promise<Result<SearchSong>> => {
  return request({
    url: "/cloudsearch",
    method: "get",
    params,
  });
};

// 热搜列表(详细)
export const getHotSearch = (): Promise<CommonResult<HotDetail[]>> => {
  return request({
    url: "/search/hot/detail",
    method: "get",
  });
};

// 获取音乐 url - 新版
export const getSongUrl = (params: {
  id: string;
  level: SongLevel;
}): Promise<CommonResult<SongUrl>> => {
  return request({
    url: "/song/url/v1",
    method: "get",
    params,
  });
};

// 获取歌曲详情
export const getSongDetail = (params: { ids: string }): Promise<SongDetail> => {
  return request({
    url: "/song/detail",
    method: "get",
    params,
  });
};

//检查音乐是否可用
export const checkMusic = (params: {
  id: number;
}): Promise<{
  code: number;
  message: string;
  success: boolean;
}> => {
  return request({
    url: "/check/music",
    method: "get",
    params,
  });
};

// 二维码登录
export const getQrKey = <T>(): Promise<CommonResult<T>> => {
  return request({
    url: "/login/qr/key",
    method: "get",
    params: {
      timestamp: Date.now(),
    },
  });
};

export const createQrCode = <T>(params: {
  key: string;
  qrimg?: boolean;
}): Promise<CommonResult<T>> => {
  return request({
    url: "/login/qr/create",
    method: "get",
    params: { ...params, timestamp: Date.now() },
  });
};

export const checkQrCode = (params: {
  key: string;
  noCookie?: boolean;
}): Promise<QrCheck> => {
  return request({
    url: "/login/qr/check",
    method: "get",
    params: { ...params, timestamp: Date.now() },
  });
};
