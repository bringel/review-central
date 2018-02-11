import { Repository, PullRequest, User } from '../db/models';

export class PullRequestClient {
  addPullRequest(response) {
    const pr = response.pull_request;
    const githubUserID = pr.user.id;
    User.findOrCreate({
      where: { githubID: githubUserID },
      defaults: {
        githubID: pr.user.id,
        githubUsename: pr.user.login
      }
    }).then(u => {
      // TODO: add status and jira issue key
      // TODO: maybe need to find or create because a review request event can sometimes come in before the open event
      PullRequest.create({
        githubID: pr.id,
        number: response.number,
        title: pr.title,
        developerID: u.id,
        pullRequestCreatedDatetime: pr.created_at,
        pullRequestUpdatedDatetime: pr.updated_at,
        branchName: pr.head.ref
      });
    });
  }
}
