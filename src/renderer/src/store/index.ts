import { defineStore } from "pinia";
import { ref } from "vue";
import { getUserAccount } from "@/api/user";

export const useUserInfo = defineStore("song", () => {
  const userAccountInfo = ref({});

  const setUserAccountInfo = async () => {
    const res = await getUserAccount();
  };

  return { userAccountInfo, setUserAccountInfo };
});
