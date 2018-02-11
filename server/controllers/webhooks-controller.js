import { Router } from 'express';

const webhooksController = Router();

webhooksController.post('/', (request, response) => {
  const webhookType = request.get('X-GitHub-Event');
  console.log(webhookType);
  switch (webhookType) {
    case 'pull_request':
      break;
    case 'pull_request_review':
      break;
    case 'pull_request_review_comment':
      break;
    case 'push':
      break;
    default:
      break;
  }
  response.sendStatus(200);
});

export default webhooksController;
