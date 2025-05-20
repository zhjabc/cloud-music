import request from "@/utils/request";

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
