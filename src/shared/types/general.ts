/* eslint-disable @typescript-eslint/no-explicit-any */
export type Dictionary = Record<string, any>;

export type Option = {
  label: string;
  value: string;
  priority: number;
};

export enum StorageType {
  local = 'local',
  session = 'session',
}

export type ErrResp = {
  status: number;
  code?: string;
  message: string;
} | null;
