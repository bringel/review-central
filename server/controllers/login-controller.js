import { Router } from 'express';

import { GithubAuthenticator } from '../github-authenticator';
import { User } from '../db/models';

const loginController = Router();

loginController.get('/github', (request, response) => {
  response.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&redirect_uri=${process.env.CALLBACK_URL}`);
});

loginController.get('/github/callback', (request, response) => {

    const code = request.query.code;
    if (!code || code === '') {
      response.sendStatus(400);
    }
    const github = new GithubAuthenticator(process.env.GITHUB_CLIENT_ID, process.env.GITHUB_CLIENT_SECRET);

    github.loginUser(code, (token, userInfo) => {
      // TODO: save the user record to the database
      User.findOrCreate({
        where: { githubID: userInfo.id },
        defaults: { githubID: userInfo.id, githubUsername: userInfo.login, githubName: userInfo.name, githubEmail: userInfo.email }})
        .then(([u, created]) => {
          request.session.userID = u.id;
          response.redirect('/');
        })
      });
    }
  );

  export default loginController;
