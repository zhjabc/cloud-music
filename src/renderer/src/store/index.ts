import { defineStore } from "pinia";
import {
  getUserAccount,
  getUserDetail,
  getUserPlaylist,
  getUserSubcount,
} from "@/api/user";
import { SubAccount, UserAccount } from "@/types/model/userAccount";
import { computed, ref } from "vue";
import { UserDetail, UserPlayList } from "@/types";

export const useUserInfo = defineStore(
  "userInfo",
  () => {
    const accountInfo = ref<{
      account: UserAccount["account"];
      profile: UserAccount["profile"];
    }>();
    const setUserAccountInfo = async () => {
      const res = await getUserAccount();
      accountInfo.value = {
        account: res.account,
        profile: res.profile,
      };
    };

    const subAccount = ref<SubAccount>();
    const setSubAccount = async () => {
      subAccount.value = await getUserSubcount();
    };

    const userDetail = ref<UserDetail>();
    const setUserDetail = async (uid: number) => {
      userDetail.value = await getUserDetail(uid);
    };

    const userPlaylist = ref<UserPlayList>();
    const setUserPlaylist = async (uid: number) => {
      userPlaylist.value = await getUserPlaylist({ uid });
    };

    const setUserInfo = async () => {
      await setUserAccountInfo();
      setSubAccount();
      setUserDetail(accountInfo.value?.account.id as number);
      setUserPlaylist(accountInfo.value?.account.id as number);
    };

    const subscribePlayList = computed(() => {
      return (
        userPlaylist.value?.playlist.filter((item) => {
          return item.subscribed;
        }) ?? []
      );
    });

    const createPlayList = computed(() => {
      return (
        userPlaylist.value?.playlist.filter((item) => {
          return !item.subscribed;
        }) ?? []
      );
    });

    return {
      accountInfo,
      subAccount,
      userDetail,
      userPlaylist,
      subscribePlayList,
      createPlayList,
      setUserInfo,
    };
  },
  {
    persist: {
      key: "userInfo",
      storage: localStorage,
      pick: ["accountInfo", "subAccount", "userPlaylist", "userDetail"],
    },
  },
);
