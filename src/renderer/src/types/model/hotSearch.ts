export interface HotSearch {
  hots: Hot[] | HotDetail[];
}

export interface Hot {
  first?: string;
  second?: number;
  third?: any;
  iconType?: number;
}

export interface HotDetail {
  searchWord: string;
  score: number;
  content: string;
  source: number;
  iconType: number;
  iconUrl: any;
  url: string;
  alg: string;
}
