declare module '@size-limit/file' {
  export type step = (config: string[], check: number) => Promise<void> | void;

  export interface FilePlugin {
    name: '@size-limit/file';
    step60: step;
  }

  const filePluginArray: [FilePlugin];

  export default filePluginArray;
}
