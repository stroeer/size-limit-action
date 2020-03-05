import { SizeLimitConfig } from 'size-limit';

export type Entry<R extends Record<any, any>> = R extends Record<infer K, infer V> ? [K, V] : never;
export type Value<R extends Record<any, any>> = R extends Record<any, infer V> ? V : never;

export interface WorkspaceJSON {
  workspaces?: string[];
}

export type Configs = Record<string, SizeLimitConfig | undefined>;

export type Sizes = Record<string, Size[] | undefined>;

export interface Size {
  path: string;
  bytes: number;
}

export type Changes = Record<
  string,
  {
    total: Change;
    files: Change[];
  }
>;

export interface Change {
  path: string;
  bytes: number;
  change: number;
  percent: number;
}

export interface FormattedChange {
  percent: string;
  path: string;
  change: string;
  bytes: string;
}

export interface TemplateVars {
  percent: string;
  path: string;
  change: string;
  bytes: string;
  changed: FormattedChange[];
  unchanged: FormattedChange[];
}

export interface FooterVars {
  affectedPackages: number;
  totalChange: string;
  totalPercent: string;
}
