import fs from 'fs';
import { resolve } from 'path';
import { SizeLimitConfigFile, SizeLimitConfig } from 'size-limit';
import { Configs, Entry } from '../types';

async function getConfigs(paths: string[]): Promise<Configs> {
  const configPromises = paths.map(async path => await getConfig(path));
  const configsEntries = await Promise.all(configPromises);
  return Object.fromEntries(configsEntries);
}

async function getConfig(path: string): Promise<Entry<Configs>> {
  const configFile = await getConfigFileName(path);
  const config = await importConfig(path, configFile);
  return [path, config];
}

async function getConfigFileName(path: string): Promise<SizeLimitConfigFile | undefined> {
  const configFiles: SizeLimitConfigFile[] = ['.size-limit.js', '.size-limit.json', 'package.json'];
  const configFile = configFiles.find(file => fs.existsSync(resolve(path, file)));
  if (isPkGJSON(configFile) && !(await hasSizeLimit(path, configFile))) return undefined;
  return configFile;
}

function isPkGJSON(file?: string): file is 'package.json' {
  return file === 'package.json';
}

async function hasSizeLimit(path: string, configFile: SizeLimitConfigFile): Promise<boolean> {
  const pgk = await import(resolve(path, configFile));
  return typeof pgk.default['size-limit'] !== 'undefined';
}

async function importConfig(path: string, configFile?: SizeLimitConfigFile): Promise<SizeLimitConfig | undefined> {
  if (!configFile) return undefined;
  const module = await import(resolve(path, configFile));
  return configFile === 'package.json' ? module.default['size-limit'] : module.default;
}

export default getConfigs;
