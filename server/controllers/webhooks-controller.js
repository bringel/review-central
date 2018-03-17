import { Router } from 'express';
import {
  addPullRequest,
  closePullRequest,
  markPullRequestAsUpdated,
  assignPullRequest,
  removeUserPullRequests,
  addReviewRequest
} from '../github/pull-request-event-functions';

const webhooksController = Router();

webhooksController.post('/', (request, response) => {
  const webhookType = request.get('X-GitHub-Event');
  const body = request.body;
  console.log(`Processing ${webhookType} type webhook`); // eslint-disable-line
  switch (webhookType) {
    case 'pull_request':
      if (body.action === 'opened') {
        addPullRequest(body).then(() => {
          response.sendStatus(201);
        });
      } else if (body.action === 'closed') {
        closePullRequest(body).then(() => {
          response.sendStatus(200);
        });
      } else if (body.action === 'reopened') {
        addPullRequest(body).then(() => {
          response.sendStatus(201);
        });
      } else if (body.action === 'synchronize') {
        markPullRequestAsUpdated(body).then(() => {
          response.sendStatus(200);
        });
      } else if (body.action === 'assigned') {
        assignPullRequest(body).then(() => {
          response.sendStatus(200);
        });
      } else if (body.action === 'unassigned') {
        removeUserPullRequests(body).then(() => {
          response.sendStatus(200);
        });
      } else if (body.action === 'review_requested') {
        addReviewRequest(body).then(() => {
          response.sendStatus(200);
        });
      } else if (body.action === 'review_request_removed') {
        removeUserPullRequests(body).then(() => {
          response.sendStatus(200);
        });
      }
      break;
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
