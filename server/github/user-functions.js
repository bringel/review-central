import { User } from '../db/models';

export function getUser(user, defaultsOverrides = {}) {
  return User.findOrCreate({
    where: { githubID: user.id },
    defaults: Object.assign(
      {},
      {
        githubID: user.id,
        githubUsername: user.login
      },
      defaultsOverrides
    )
  }).then(([u]) => u);
}
