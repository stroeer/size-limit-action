/// <reference path="../types/size-limit.d.ts" />
/// <reference path="../types/@size-limit/file.d.ts" />

import { createReports, createDiffComment } from './action';

async function run(packages: string, owner: string, repo: string) {
  const { master, current } = await createReports(packages, owner, repo);
  const comment = await createDiffComment(master, current);
  console.log(comment);
}

process.chdir('../..');
console.log('cwd is', process.cwd());

run('packages/ui-library', 'stroeer', 'paper');
