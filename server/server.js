const express = require('express');
const path = require('path');
require('dotenv').config();
const OAuth2 = require('oauth').OAuth2;

const app = express();
const port = process.env.PORT || 3000;
const callbackURL = 'http://127.0.0.1:3000/login/github/callback';

app.use(express.static(path.join(__dirname, 'dist')));

app.get('/login/github', function(req, res) {
  res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&redirect_uri=${callbackURL}`);
});

app.get('/login/github/callback', function(request, response) {

  const code = request.query.code;
  const oauthClient = new OAuth2(process.env.GITHUB_CLIENT_ID, process.env.GITHUB_CLIENT_SECRET, 'https://github.com', '/login/oauth/authorize', '/login/oauth/access_token');

  oauthClient.getOAuthAccessToken(code, {}, function (e, access_token, refresh_token, results){
    console.log('bearer: ',access_token);
    response.send(access_token);
  });
}
);

app.listen(port, function() {
  console.log(`app listening on port ${port}`);
});
