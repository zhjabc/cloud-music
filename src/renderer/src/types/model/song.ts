export interface SearchSong {
  searchQcReminder: any;
  songs: Song[];
  songCount: number;
}

export interface RecentSong {
  list: RecentSongItem[];
}

export interface RecentSongItem {
  banned: boolean;
  data: Song;
  multiTerminalInfo: MultiTerminalInfo;
  playTime: number;
  resourceId: string;
  resourceType: string;
}

export interface MultiTerminalInfo {
  icon: string;
  os: string;
  osText: string;
}

export interface Song {
  name: string;
  id: number;
  pst: number;
  t: number;
  ar: Ar[];
  alia: string[];
  pop: number;
  st: number;
  rt?: string;
  fee: number;
  v: number;
  crbt: any;
  cf: string;
  al: Al;
  dt: number;
  h: H;
  m: M;
  l?: L;
  sq?: Sq;
  hr?: Hr;
  a: any;
  cd: string;
  no: number;
  rtUrl: any;
  ftype: number;
  rtUrls: any[];
  djId: number;
  copyright: number;
  s_id: number;
  mark: number;
  originCoverType: number;
  originSongSimpleData?: OriginSongSimpleData;
  tagPicList: any;
  resourceState: boolean;
  version: number;
  songJumpInfo: any;
  entertainmentTags: any;
  single: number;
  noCopyrightRcmd: any;
  rtype: number;
  rurl: any;
  mst: number;
  cp: number;
  mv: number;
  publishTime: number;
  privilege: Privilege;
  tns?: string[];
}

export interface Ar {
  id: number;
  name: string;
  tns: string[];
  alias: string[];
  alia?: string[];
}

export interface Al {
  id: number;
  name: string;
  picUrl: string;
  tns: string[];
  pic_str?: string;
  pic: number;
}

export interface H {
  br: number;
  fid: number;
  size: number;
  vd: number;
  sr: number;
}

export interface M {
  br: number;
  fid: number;
  size: number;
  vd: number;
  sr: number;
}

export interface L {
  br: number;
  fid: number;
  size: number;
  vd: number;
  sr: number;
}

export interface Sq {
  br: number;
  fid: number;
  size: number;
  vd: number;
  sr: number;
}

export interface Hr {
  br: number;
  fid: number;
  size: number;
  vd: number;
  sr: number;
}

export interface OriginSongSimpleData {
  songId: number;
  name: string;
  artists: Artist[];
  albumMeta: AlbumMeta;
}

export interface Artist {
  id: number;
  name: string;
}

export interface AlbumMeta {
  id: number;
  name: string;
}

export interface Privilege {
  id: number;
  fee: number;
  payed: number;
  st: number;
  pl: number;
  dl: number;
  sp: number;
  cp: number;
  subp: number;
  cs: boolean;
  maxbr: number;
  fl: number;
  toast: boolean;
  flag: number;
  preSell: boolean;
  playMaxbr: number;
  downloadMaxbr: number;
  maxBrLevel: string;
  playMaxBrLevel: string;
  downloadMaxBrLevel: string;
  plLevel: string;
  dlLevel: string;
  flLevel: string;
  rscl: number;
  freeTrialPrivilege: FreeTrialPrivilege;
  rightSource: number;
  chargeInfoList: ChargeInfoList[];
  code: number;
  message: any;
  plLevels: any;
  dlLevels: any;
  ignoreCache: any;
}

export interface FreeTrialPrivilege {
  resConsumable: boolean;
  userConsumable: boolean;
  listenType: any;
  cannotListenReason?: number;
  playReason: any;
  freeLimitTagType: any;
}

export interface ChargeInfoList {
  rate: number;
  chargeUrl: any;
  chargeMessage: any;
  chargeType: number;
}

export interface SongUrl {
  id: number;
  url: string;
  br: number;
  size: number;
  md5: string;
  code: number;
  expi: number;
  type: string;
  gain: number;
  peak: number;
  closedGain: number;
  closedPeak: number;
  fee: number;
  uf: any;
  payed: number;
  flag: number;
  canExtend: boolean;
  freeTrialInfo: any;
  level: string;
  encodeType: string;
  channelLayout: any;
  freeTrialPrivilege: FreeTrialPrivilege;
  freeTimeTrialPrivilege: FreeTimeTrialPrivilege;
  urlSource: number;
  rightSource: number;
  podcastCtrp: any;
  effectTypes: any;
  time: number;
  message: any;
  levelConfuse: any;
  musicId: string;
  accompany: any;
  sr: number;
  auEff: any;
}

export interface FreeTrialPrivilege {
  resConsumable: boolean;
  userConsumable: boolean;
  listenType: any;
  cannotListenReason: any;
  playReason: any;
  freeLimitTagType: any;
}

export interface FreeTimeTrialPrivilege {
  resConsumable: boolean;
  userConsumable: boolean;
  type: number;
  remainTime: number;
}

export interface SongDetail {
  code: number;
  songs: Song[];
  privileges: Privilege[];
}

export interface Privilege {
  id: number;
  fee: number;
  payed: number;
  st: number;
  pl: number;
  dl: number;
  sp: number;
  cp: number;
  subp: number;
  cs: boolean;
  maxbr: number;
  fl: number;
  toast: boolean;
  flag: number;
  preSell: boolean;
  playMaxbr: number;
  downloadMaxbr: number;
  maxBrLevel: string;
  playMaxBrLevel: string;
  downloadMaxBrLevel: string;
  plLevel: string;
  dlLevel: string;
  flLevel: string;
  rscl: any;
  freeTrialPrivilege: FreeTrialPrivilege;
  rightSource: number;
  chargeInfoList: ChargeInfoList[];
  code: number;
  message: any;
  plLevels: any;
  dlLevels: any;
  ignoreCache: any;
}

export interface FreeTrialPrivilege {
  resConsumable: boolean;
  userConsumable: boolean;
  listenType: any;
  cannotListenReason: any;
  playReason: any;
  freeLimitTagType: any;
}

export interface ChargeInfoList {
  rate: number;
  chargeUrl: any;
  chargeMessage: any;
  chargeType: number;
}
