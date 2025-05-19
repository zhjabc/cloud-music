export interface UserDetail {
  level: number;
  listenSongs: number;
  userPoint: UserPoint;
  mobileSign: boolean;
  pcSign: boolean;
  profile: Profile;
  peopleCanSeeMyPlayRecord: boolean;
  bindings: Binding[];
  adValid: boolean;
  code: number;
  newUser: boolean;
  recallUser: boolean;
  createTime: number;
  createDays: number;
  profileVillageInfo: ProfileVillageInfo;
}

export interface UserPoint {
  userId: number;
  balance: number;
  updateTime: number;
  version: number;
  status: number;
  blockBalance: number;
}

export interface Profile {
  privacyItemUnlimit: PrivacyItemUnlimit;
  avatarDetail: any;
  experts: Experts;
  authStatus: number;
  expertTags: any;
  createTime: number;
  province: number;
  city: number;
  birthday: number;
  gender: number;
  nickname: string;
  backgroundImgId: number;
  backgroundUrl: string;
  userType: number;
  defaultAvatar: boolean;
  avatarUrl: string;
  vipType: number;
  detailDescription: string;
  accountStatus: number;
  remarkName: any;
  followed: boolean;
  mutual: boolean;
  djStatus: number;
  avatarImgId: number;
  avatarImgIdStr: string;
  backgroundImgIdStr: string;
  description: string;
  userId: number;
  signature: string;
  authority: number;
  followeds: number;
  follows: number;
  blacklist: boolean;
  eventCount: number;
  allSubscribedCount: number;
  playlistBeSubscribedCount: number;
  followTime: any;
  followMe: boolean;
  artistIdentity: any[];
  cCount: number;
  inBlacklist: boolean;
  sDJPCount: number;
  playlistCount: number;
  sCount: number;
  newFollows: number;
}

export interface PrivacyItemUnlimit {
  area: boolean;
  college: boolean;
  gender: boolean;
  age: boolean;
  villageAge: boolean;
}

export interface Experts {}

export interface Binding {
  expiresIn: number;
  refreshTime: number;
  bindingTime: number;
  tokenJsonStr: any;
  url: string;
  expired: boolean;
  userId: number;
  id: number;
  type: number;
}

export interface ProfileVillageInfo {
  title: string;
  imageUrl: any;
  targetUrl: string;
}
