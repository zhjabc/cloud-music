import request from "@/utils/request";

export const getUserAccount = <T>(): Promise<T> => {
  return request({
    url: "/user/account",
    method: "get",
  });
};
