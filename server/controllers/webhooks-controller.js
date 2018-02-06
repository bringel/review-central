import { Router } from 'express';

const webhooksController = Router();

webhooksController.post('/', (request, response) => {
  const webhookType = request.get('X-GitHub-Event');
  console.log(webhookType);

  response.sendStatus(200);
});

export default webhooksController;
