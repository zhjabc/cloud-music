export interface Account {
  id: number;
  userName: string;
  type: number;
  status: number;
  whitelistAuthority: number;
  createTime: number;
  tokenVersion: number;
  ban: number;
  baoyueVersion: number;
  donateVersion: number;
  vipType: number;
  anonimousUser: boolean;
  paidFee: boolean;
}

export interface Profile1 {
  userId: number;
  userType: number;
  nickname: string;
  avatarImgId: number;
  avatarUrl: string;
  backgroundImgId: number;
  backgroundUrl: string;
  signature?: any;
  createTime: number;
  userName: string;
  accountType: number;
  shortUserName: string;
  birthday: number;
  authority: number;
  gender: number;
  accountStatus: number;
  province: number;
  city: number;
  authStatus: number;
  description?: any;
  detailDescription?: any;
  defaultAvatar: boolean;
  expertTags?: any;
  experts?: any;
  djStatus: number;
  locationStatus: number;
  vipType: number;
  followed: boolean;
  mutual: boolean;
  authenticated: boolean;
  lastLoginTime: number;
  lastLoginIP: string;
  remarkName?: any;
  viptypeVersion: number;
  authenticationTypes: number;
  avatarDetail?: any;
  anchor: boolean;
}

export interface UserAccount {
  code: number;
  account: Account;
  profile: Profile1;
}

export interface SubAccount {
  programCount: number;
  djRadioCount: number;
  mvCount: number;
  artistCount: number;
  newProgramCount: number;
  createDjRadioCount: number;
  createdPlaylistCount: number;
  subPlaylistCount: number;
  code: number;
}
