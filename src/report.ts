import fs from 'fs';
import { resolve } from 'path';
import * as artifact from '@actions/artifact';
import { mkdirP } from '@actions/io';
import { getPaths, getConfigs, getSizes } from './createReport';
import diffSizes from './diffSizes';
import { Sizes, Changes } from './types';

const ACTION_TMP_DIR = resolve(__dirname, '../.size-limit-action-temp-files');
const UPLOADS_DIR = resolve(ACTION_TMP_DIR, 'uploads');
const DOWNLOADS_DIR = resolve(ACTION_TMP_DIR, 'downloads');

export async function save(name: string, sizes: Sizes): Promise<void> {
  const client = artifact.create();
  const filePath = resolve(UPLOADS_DIR, `${name}.json`);
  await mkdirP(UPLOADS_DIR);
  await fs.promises.writeFile(filePath, JSON.stringify(sizes), 'utf8');
  await client.uploadArtifact(name, [filePath], UPLOADS_DIR, { continueOnError: false });
}

// todo proper error handling, what if the import() fails
// todo the currently logged warning in the catch(error) should be part of the comment footer
export async function load(name: string): Promise<Sizes> {
  const client = artifact.create();
  try {
    await client.downloadArtifact(name, DOWNLOADS_DIR);
    const module = await import(resolve(UPLOADS_DIR, `${name}.json`));
    return module.default;
  } catch (error) {
    console.warn(
      `Warning: Failed to load saved sizes for "${name}" (${error.message}). Falling back an empty set of sizes, meaning all diffs are a 100% increase.`,
    );
    return {};
  }
}

export async function create(pattern: string, cwd?: string): Promise<Sizes> {
  const paths = await getPaths(pattern, cwd);
  const configs = await getConfigs(paths);
  return await getSizes(configs);
}

export async function diff(oldSizes: Sizes, newSizes: Sizes): Promise<Changes> {
  const paths = Object.keys(newSizes);
  const changes = paths.map(path => diffSizes(path, oldSizes[path], newSizes[path]));
  return Object.fromEntries(changes);
}
