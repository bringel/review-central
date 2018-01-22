import express from 'express';

import { User } from '../db/models';

export const userController = express.Router();

userController.get('/', (request, response) => {
  if (request.session.userID) {
    console.log(`Found session user: ${request.session.userID}`);

    const user = User.findById(request.session.userID);
    response.json(user);
  }
  else {
    response.sendStatus(401);
  }
});
