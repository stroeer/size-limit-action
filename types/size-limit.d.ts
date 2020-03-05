declare module 'size-limit' {
  export type SizeLimitPluginStep = (config: string[], check: number) => Promise<void> | void;

  export type SizeLimitConfigFile = '.size-limit.js' | '.size-limit.json' | 'package.json';

  export type SizeLimitConfig = {
    name: string;
    path: string;
    webpack: boolean;
  }[];

  export interface SizeLimitPlugin {
    name: string;
    step10?: SizeLimitPluginStep;
    step20?: SizeLimitPluginStep;
    step30?: SizeLimitPluginStep;
    step40?: SizeLimitPluginStep;
    step50?: SizeLimitPluginStep;
    step60?: SizeLimitPluginStep;
    step70?: SizeLimitPluginStep;
    step80?: SizeLimitPluginStep;
    step90?: SizeLimitPluginStep;
    step100?: SizeLimitPluginStep;
  }

  export type SizeLimitResult = {
    path: string;
    size: number;
    time?: number;
    runTime?: number;
    loadTime?: number;
  };

  export default function sizeLimit(
    plugins: [SizeLimitPlugin][],
    files: (string | SizeLimitConfig)[],
  ): Promise<SizeLimitResult[]>;
}
