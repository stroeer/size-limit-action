import { resolve } from 'path';
import { exec } from '@actions/exec';
import { mkdirP } from '@actions/io';

const ACTION_TMP_DIR = resolve(__dirname, '../.size-limit-action-temp-files');
const MASTER_REPO_DIR = resolve(ACTION_TMP_DIR, 'master');

export async function clone(token: string, owner: string, repo: string): Promise<string> {
  await mkdirP(ACTION_TMP_DIR);
  const basicCredential = Buffer.from(`x-access-token:${token}`, 'utf8').toString('base64');
  await exec(
    `git -c http.extraheader="AUTHORIZATION: Basic ${basicCredential}" clone https://github.com/${owner}/${repo} ${MASTER_REPO_DIR}`,
  );
  await exec(`yarn`, ['install'], { cwd: MASTER_REPO_DIR });
  return MASTER_REPO_DIR;
}
