import { Router } from 'express';

import { User } from '../db/models';

const userController = Router();

userController.get('/', (request, response) => {
  if (request.session.userID) {
    User.findById(request.session.userID).then(user => {
      response.json(user);
    });
  } else {
    response.sendStatus(401);
  }
});

export default userController;
