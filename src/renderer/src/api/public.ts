import request from "@/utils/request";
import { CommonResult, QrCheck, Result, SongLevel } from "@/types";
// 搜索歌曲
export const getSearchSong = <T>(params: {
  keywords: string;
  limit?: number;
  type?: number;
  offset?: number;
}): Promise<Result<T>> => {
  return request({
    url: "/cloudsearch",
    method: "get",
    params,
  });
};

// 热搜列表(简略)
export const getHotSearch = <T>(params = {}): Promise<Result<T>> => {
  return request({
    url: "/search/hot",
    method: "get",
    params,
  });
};

// 获取音乐 url - 新版
export const getSongUrl = <T>(params: {
  id: string;
  level: SongLevel;
}): Promise<Result<T>> => {
  return request({
    url: "/song/url/v1",
    method: "get",
    params,
  });
};

//检查音乐是否可用
export const checkMusic = (params: {
  id: number;
}): Promise<
  Result<{
    code: number;
    message: string;
    success: boolean;
  }>
> => {
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
  timestamp: number;
}): Promise<CommonResult<T>> => {
  return request({
    url: "/login/qr/create",
    method: "get",
    params,
  });
};
export const checkQrCode = (params: {
  key: string;
  noCookie?: boolean;
  timestamp: number;
}): Promise<QrCheck> => {
  return request({
    url: "/login/qr/check",
    method: "get",
    params,
  });
};
