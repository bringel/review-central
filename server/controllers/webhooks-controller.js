import { Router } from 'express';

import { PullRequestClient } from '../github/pull-request-client';

const webhooksController = Router();

webhooksController.post('/', (request, response) => {
  const webhookType = request.get('X-GitHub-Event');
  const body = request.body;
  console.log(webhookType);
  switch (webhookType) {
    case 'pull_request': {
      const prClient = new PullRequestClient();
      if (body.action === 'opened') {
        prClient.addPullRequest(body).then(() => {
          response.sendStatus(201);
        });
      }
      break;
    }
    case 'pull_request_review':
      break;
    case 'pull_request_review_comment':
      break;
    case 'push':
      break;
    default:
      response.sendStatus(200);
      break;
  }
});

export default webhooksController;
