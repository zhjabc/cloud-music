import request from "@/utils/request";
import { RecommendResult, RecommendSong } from "@/types/model/recommend";
import { CommonResult } from "@/types";

// 获取每日推荐歌单
export const getRecommend = (): Promise<RecommendResult> => {
  return request({
    url: "/recommend/resource",
    method: "get",
  });
};

// 获取每日推荐歌曲
export const getRecommendSongs = (): Promise<CommonResult<RecommendSong>> => {
  return request({
    url: "/recommend/songs",
    method: "get",
  });
};
