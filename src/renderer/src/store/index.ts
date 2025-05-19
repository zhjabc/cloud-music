import { defineStore } from "pinia";
import {
  getUserAccount,
  getUserDetail,
  getUserPlaylist,
  getUserSubcount,
} from "@/api/user";
import { SubAccount, UserAccount } from "@/types/model/userAccount";
import { computed, ref } from "vue";
import {
  Song,
  SongDetail,
  SongLevel,
  SongUrl,
  UserDetail,
  UserPlayList,
} from "@/types";
import { getSongDetail, getSongUrl } from "@/api/public";

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

export const usePlayerStore = defineStore(
  "player",
  () => {
    const isPlaying = ref(false);
    const currentSong = ref<SongUrl>();
    const currentSongDetail = ref<Song>();
    const currentIndex = ref(0);
    const playList = ref<SongDetail[]>([]);

    const setCurrentSong = async (
      id: string,
      level: SongLevel = "standard",
    ) => {
      const res = await getSongUrl({ id, level });
      currentSong.value = res.data[0];
    };

    const setCurrentDetail = async (ids: string) => {
      const res = await getSongDetail({ ids });
      currentSongDetail.value = res.songs[0];
    };

    const setCurrentIndex = (index: number) => {
      currentIndex.value = index;
    };

    const setPlayList = (list: SongDetail[]) => {
      playList.value = list;
    };

    const setSongInfo = (id: string) => {
      setCurrentSong(id);
      setCurrentDetail(id);
    };

    return {
      isPlaying,
      currentSong,
      currentSongDetail,
      currentIndex,
      playList,
      setCurrentSong,
      setCurrentIndex,
      setPlayList,
      setSongInfo,
    };
  },
  {
    persist: {
      key: "player",
      storage: localStorage,
      pick: ["currentSong", "currentSongDetail"],
    },
  },
);
