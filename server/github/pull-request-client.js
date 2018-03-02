import { PullRequest, UserPullRequest } from '../db/models';
import { getUser } from './user-functions';
import { getRepository } from './repository-functions';
import { getPullRequest } from './pull-request-functions';

export class PullRequestClient {
  static addPullRequest(response) {
    return Promise.all([getRepository(response.repository), getUser(response.pull_request.user)])
      .then(([repo, user]) => {
        const pullRequest = getPullRequest(response.pull_request, { developerID: user.id });

        return Promise.all([repo, pullRequest]);
      })
      .then(([repo, pullRequest]) => {
        return repo.addPullRequest(pullRequest);
      });
  }

  static closePullRequest(response) {
    return PullRequest.destroy({ where: { githubID: response.pull_request.id } });
  }

  static markPullRequestAsUpdated(response) {
    return PullRequest.findAll({ where: { githubID: response.pull_request.id } })
      .then(pullRequests => pullRequests.map(r => r.id))
      .then(pullRequestIDs => {
        return UserPullRequest.update({ status: 'active' }, { where: { pullRequestID: pullRequestIDs } });
      });
  }

  static assignPullRequest(response) {
    return Promise.all(response.pull_request.assignees.map(u => getUser(u))).then(users => {
      getPullRequest(response.pull_request).then(pr => {
        return pr.addUsers(users, { through: { status: 'active' } });
      });
    });
  }

  static removeUserPullRequests(response) {
    return PullRequest.findAll({ where: { githubID: response.pull_request.id } }).then(prs => {
      const pullRequestIDs = prs.map(pr => pr.id);
      return UserPullRequest.destroy({ where: { pullRequestID: pullRequestIDs } });
    });
  }

  static addReviewRequest(response) {
    return Promise.all(response.pull_request.requested_reviewers.map(u => getUser(u))).then(users => {
      getPullRequest(response.pull_request).then(pr => {
        return pr.addUsers(users, { through: { status: 'active ' } });
      });
    });
  }
}
