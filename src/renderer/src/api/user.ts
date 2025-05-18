import request from "@/utils/request";
import { UserAccount } from "@/types/model/userAccount";

export const getUserAccount = (): Promise<UserAccount> => {
  return request({
    url: "/user/account",
    method: "get",
  });
};
