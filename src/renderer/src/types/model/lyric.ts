export interface LyricResult {
  sgc: boolean;
  sfy: boolean;
  qfy: boolean;
  lrc: Lrc;
  klyric: Klyric;
  tlyric: Tlyric;
  romalrc: Romalrc;
  code: number;
}

export interface Lrc {
  version: number;
  lyric: string;
}

export interface Klyric {
  version: number;
  lyric: string;
}

export interface Tlyric {
  version: number;
  lyric: string;
}

export interface Romalrc {
  version: number;
  lyric: string;
}
