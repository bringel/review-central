import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

import { GithubAuthenticator } from './github-authenticator';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
const callbackURL = 'http://127.0.0.1:3000/login/github/callback';

app.use(express.static(path.join(__dirname, '../../dist')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.get('/login/github', function(req, res) {
  res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&redirect_uri=${callbackURL}`);
});

app.get('/login/github/callback', function(request, response) {

    const code = request.query.code;
    if (!code || code === '') {
      response.sendStatus(400);
    }
    const github = new GithubAuthenticator(process.env.GITHUB_CLIENT_ID, process.env.GITHUB_CLIENT_SECRET, callbackURL);

    github.loginUser(code, function(token, userInfo) {
      // TODO: save the user record to the database

      response.redirect('/');
    });
  }
);

app.listen(port, function() {
  console.log(`app listening on port ${port}`);
});
