import { GitHub, context } from '@actions/github';
import { getChangeVars, getFooterVars, change, twoLineBreaks, footer } from './commentTemplate';
import getCommentMarker from './commentMarker';
import { Changes } from './types';

export async function createCommentFromChanges(changes: Changes): Promise<string> {
  return Object.values(changes)
    .map(c => getChangeVars(c))
    .map(v => change(v))
    .concat([footer(getFooterVars(changes))])
    .join(twoLineBreaks);
}

export async function postOrUpdateComment(token: string, comment: string): Promise<void> {
  const octokit = new GitHub(token);
  const reviewId = await getReviewId(octokit);
  if (reviewId) {
    await updateReview(octokit, reviewId, comment);
  } else {
    await postReview(octokit, comment);
  }
}

async function updateReview(octokit: GitHub, review_id: number, body: string): Promise<void> {
  const { owner, repo, number: pull_number } = context.issue;
  await octokit.pulls.updateReview({ owner, repo, pull_number, review_id, body });
}

async function postReview(octokit: GitHub, body: string): Promise<void> {
  const { owner, repo, number: pull_number } = context.issue;
  const event = 'COMMENT';
  await octokit.pulls.createReview({ owner, repo, pull_number, event, body });
}

async function getReviewId(octokit: GitHub): Promise<number | undefined> {
  const { owner, repo, number: pull_number } = context.issue;
  const marker = getCommentMarker();
  const response = await octokit.pulls.listReviews({ owner, repo, pull_number });
  for (const { user, body, id } of response.data) {
    if (user.type === 'Bot' && body.includes(marker)) return id;
  }
}
