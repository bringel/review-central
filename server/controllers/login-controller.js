import express from 'express';

import { GithubAuthenticator } from '../github-authenticator';
import { User } from '../db/models';

export const loginController = express.Router();
const callbackURL = 'http://127.0.0.1:3000/login/github/callback';

loginController.get('/github', function(req, res) {
  res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&redirect_uri=${callbackURL}`);
});

loginController.get('/github/callback', function(request, response) {

    const code = request.query.code;
    if (!code || code === '') {
      response.sendStatus(400);
    }
    const github = new GithubAuthenticator(process.env.GITHUB_CLIENT_ID, process.env.GITHUB_CLIENT_SECRET, callbackURL);

    github.loginUser(code, function(token, userInfo) {
      // TODO: save the user record to the database
      User.findOrCreate({
        where: { githubID: userInfo.id },
        defaults: { githubID: userInfo.id, githubUsername: userInfo.login, githubName: userInfo.name, githubEmail: userInfo.email }})
        .then(function([u, created]){
          console.log(created);
          response.redirect('/');
        })
      });
    }
  );
