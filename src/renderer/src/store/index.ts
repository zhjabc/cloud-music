import { defineStore } from "pinia";
import { getUserAccount } from "@/api/user";
import { UserAccount } from "@/types/model/userAccount";
import { ref } from "vue";

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

    return { accountInfo, setUserAccountInfo };
  },
  {
    persist: {
      key: "userInfo",
      storage: localStorage,
      pick: ["accountInfo"],
    },
  },
);
