import { Repository, PullRequest, User, UserPullRequest } from '../db/models';

export class PullRequestClient {
  static addPullRequest(response) {
    return Promise.all([
      Repository.findOrCreate({
        where: { githubID: response.repository.id },
        defaults: {
          githubID: response.repository.id,
          name: response.repository.name,
          url: response.repository.html_url
        }
      }).then(([repo]) => repo),
      User.findOrCreate({
        where: { githubID: response.pull_request.user.id },
        defaults: {
          githubID: response.pull_request.user.id,
          githubUsername: response.pull_request.user.login
        }
      }).then(([user]) => user)
    ])
      .then(([repo, user]) => {
        const pullRequest = PullRequest.findOrCreate({
          where: { githubID: response.pull_request.id },
          defaults: {
            githubID: response.pull_request.id,
            number: response.pull_request.number,
            title: response.pull_request.title,
            developerID: user.id,
            pullRequestCreatedDatetime: response.pull_request.created_at,
            pullRequestUpdatedDatetime: response.pull_request.updated_at,
            branchName: response.pull_request.head.ref
          }
        }).then(([pullRequest]) => pullRequest);

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
    return Promise.all(
      response.pull_request.assignees.map(u =>
        User.findOrCreate({
          where: { githubID: u.id },
          defaults: {
            githubID: u.id,
            githubUsername: u.login
          }
        }).then(([u]) => u)
      )
    ).then(users => {
      return PullRequest.findOrCreate({
        where: { githubID: response.pull_request.id },
        defaults: {
          githubID: response.pull_request.id,
          number: response.pull_request.number,
          title: response.pull_request.title,
          pullRequestCreatedDatetime: response.pull_request.created_at,
          pullRequestUpdatedDatetime: response.pull_request.updated_at,
          branchName: response.pull_request.head.ref
        }
      }).then(([pr]) => {
        return pr.addUsers(users, { through: { status: 'active' } });
      });
    });
  }
}
