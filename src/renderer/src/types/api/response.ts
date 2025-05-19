export interface Result<T> {
  code: number;
  result: T;
}

export interface CommonResult<T> {
  code: number;
  data: T;
  message?: string;
}

export interface QrKey {
  code: number;
  unikey: string;
}
export interface QrCode {
  qrimg?: string;
  qrurl: string;
}
export interface QrCheck {
  code: number;
  cookie: string;
  message: string;
}
