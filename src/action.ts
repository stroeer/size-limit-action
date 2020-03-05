import { create, diff } from './report';
import { clone } from './git';
import { createCommentFromChanges, postOrUpdateComment } from './comment';
import { Sizes } from './types';

export default async function run(token: string, packages: string, owner: string, repo: string) {
  const { master, current } = await createReports(token, packages, owner, repo);
  const comment = await createDiffComment(master, current);
  postOrUpdateComment(token, comment);
}

export async function createReports(
  token: string,
  packages: string,
  owner: string,
  repo: string,
): Promise<{ current: Sizes; master: Sizes }> {
  const current = await create(packages, '.');
  const clonedMasterDir = await clone(token, owner, repo);
  const master = await create(packages, clonedMasterDir);
  return { master, current };
}

export async function createDiffComment(currentReport: Sizes, masterReport: Sizes): Promise<string> {
  const changes = await diff(masterReport, currentReport);
  return await createCommentFromChanges(changes);
}
