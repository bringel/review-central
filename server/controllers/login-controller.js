import { Router } from 'express';

import { sessionStore } from '../session-store';
import { GithubAuthenticator } from '../github/github-authenticator';
import { User } from '../db/models';

const loginController = Router();

loginController.get('/github', (request, response) => {
  const callbackWithSession = encodeURIComponent(`${process.env.CALLBACK_URL}?sid=${request.session.id}`);
  response.redirect(
    `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&redirect_uri=${callbackWithSession}` // prettier-ignore
  );
});

loginController.get('/github/callback', (request, response) => {
  const sessionID = request.query.sid;
  const code = request.query.code;
  if (!code || code === '') {
    response.sendStatus(400);
  }
  const github = new GithubAuthenticator(process.env.GITHUB_CLIENT_ID, process.env.GITHUB_CLIENT_SECRET);

  github.loginUser(code, (token, userInfo) => {
    User.findOrCreate({
      where: { githubID: userInfo.id },
      defaults: {
        githubID: userInfo.id,
        githubUsername: userInfo.login,
        githubName: userInfo.name,
        githubEmail: userInfo.email
      }
    }).then(([u, created]) => {
      sessionStore.get(sessionID, (error, session) => {
        session.userID = u.id;
        sessionStore.set(sessionID, session, error => {
          if (error) {
            console.log(error); // eslint-disable-line
          }
        });
        response.redirect('back');
      });
    });
  });
});

export default loginController;
