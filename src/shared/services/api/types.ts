export type ReqHeaders = {
  'Content-Type'?: string;
  Authorization: string;
};

export type ReqConfig = Omit<RequestInit, 'body'> & {
  body?: RequestInit['body'] | object;
};

export type ErrData = {
  code?: string;
  message?: string;
  errors?: Record<string, string[]>;
  status?: number;
  title?: string;
};

export type ErrResp = {
  status: number;
  code?: string;
  message: string;
};
