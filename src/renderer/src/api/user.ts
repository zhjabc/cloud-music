import request from "@/utils/request";
import { SubAccount, UserAccount, UserDetail, UserPlayList } from "@/types";
import { Page } from "@/types";

export const getUserAccount = (): Promise<UserAccount> => {
  return request({
    url: "/user/account",
    method: "get",
  });
};

//获取用户信息 , 歌单，收藏，mv, dj 数量
export const getUserSubcount = (): Promise<SubAccount> => {
  return request({
    url: "/user/subcount",
    method: "get",
  });
};

//获取用户详情
export const getUserDetail = (uid: number): Promise<UserDetail> => {
  return request({
    url: "/user/detail",
    method: "get",
    params: {
      uid,
    },
  });
};

//获取用户歌单
export const getUserPlaylist = (
  params: {
    uid: number;
  } & Page,
): Promise<UserPlayList> => {
  return request({
    url: "/user/playlist",
    method: "get",
    params,
  });
};
