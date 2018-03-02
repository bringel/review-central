import { PullRequest } from '../db/models';

export function getPullRequest(pr, defaultsOverrides = {}) {
  return PullRequest.findOrCreate({
    where: { githubID: pr.id },
    defaults: Object.assign(
      {},
      {
        githubID: pr.id,
        number: pr.number,
        title: pr.title,
        pullRequestCreatedDatetime: pr.created_at,
        pullRequestUpdatedDatetime: pr.updated_at,
        branchName: pr.head.ref
      },
      defaultsOverrides
    )
  }).then(([r]) => r);
}
