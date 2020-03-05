import { getInput, setFailed } from '@actions/core';
import { context } from '@actions/github';
import run from './action';

(async () => {
  try {
    const { owner, repo } = context.issue;
    const token = getInput('github-token', { required: true });
    const packages = getInput('packages');
    run(token, packages, owner, repo);
  } catch (error) {
    setFailed(error.message);
  }
})();
