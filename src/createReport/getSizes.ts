import { resolve } from 'path';
import sizeLimit from 'size-limit';
import filePlugin from '@size-limit/file';
import { Configs, Sizes, Size, Entry } from '../types';

async function getSizes(configs: Configs): Promise<Sizes> {
  const sizesPromises = Object.entries(configs).map(config => getSize(config));
  const sizesEntries = await Promise.all(sizesPromises);
  return Object.fromEntries(sizesEntries);
}

async function getSize([path, config]: Entry<Configs>): Promise<Entry<Sizes>> {
  if (!config) return [path, undefined];
  const sizesEntriesPromises = config.map(config => getSizeEntry(path, config.path));
  const sizesEntries = await Promise.all(sizesEntriesPromises);
  return [path, sizesEntries];
}

async function getSizeEntry(packagePath: string, path: string): Promise<Size> {
  const [{ size: bytes }] = await sizeLimit([filePlugin], [resolve(packagePath, path)]);
  return { path, bytes };
}

export default getSizes;
