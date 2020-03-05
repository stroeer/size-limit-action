import fs from 'fs';
import { resolve } from 'path';
import { promisify } from 'util';
import glob from 'glob';
import { WorkspaceJSON } from '../types';

async function getPaths(pattern: string, cwd?: string): Promise<string[]> {
  const paths = await promisify(glob)(pattern, { cwd });
  const pathsFromWorkspaces = await getPathsFromWorkspaces(paths);
  return [...paths, ...pathsFromWorkspaces];
}

async function getPathsFromWorkspaces(paths: string[]): Promise<string[]> {
  const packageJSONs = await getPackageJSONs(paths);
  const workspaces = packageJSONs.map(({ workspaces }) => workspaces || []);
  const workspacesFlat = workspaces.flat();
  const workspacesPathsPromises = workspacesFlat.map(async entry => await getPaths(entry));
  const workspacesPaths = await Promise.all(workspacesPathsPromises);
  return workspacesPaths.flat();
}

async function getPackageJSONs(paths: string[]): Promise<WorkspaceJSON[]> {
  const pkgJSONPaths = paths.map(path => resolve(path, 'package.json'));
  const existingPkgJSONs = pkgJSONPaths.filter(fs.existsSync);
  const importPromises = existingPkgJSONs.map(async file => await import(file));
  const imports = await Promise.all<{ default: WorkspaceJSON }>(importPromises);
  return imports.map(json => json.default);
}

export default getPaths;
