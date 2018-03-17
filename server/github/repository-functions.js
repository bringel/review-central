import { Repository } from '../db/models';

export function getRepository(repo, defaultsOverrides = {}) {
  return Repository.findOrCreate({
    where: { githubID: repo.id },
    defaults: Object.assign(
      {},
      {
        githubID: repo.id,
        name: repo.name,
        url: repo.html_url
      },
      defaultsOverrides
    )
  }).then(([r]) => r);
}
