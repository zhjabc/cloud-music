export type SongLevel =
  | "standard"
  | "higher"
  | "exhigh"
  | "lossless"
  | "hires"
  | "jyeffect"
  | "sky"
  | "dolby"
  | "jymaster";

export interface Page {
  offset?: number;
  limit?: number;
}
