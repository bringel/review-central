const express = require('express');
const path = require('path');
require('dotenv').config();
const passport = require('passport');
const GithubStrategy = require('passport-github2').Strategy;

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'dist')));

passport.use(new GithubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: 'http://127.0.0.1:3000/api/login/github/callback'
  },
  (accessToken, refreshToken, profile, cb) => {
    console.log(`Access token: ${accessToken} refreshToken: ${refreshToken}, profile: ${profile}`);
    cb({});
  }));

app.get('/api/login/github', passport.authenticate('github'));

app.get('/api/login/github/callback',
  passport.authenticate('github', {
    failureRedirect: '/'
  }),
  function(req, res) {
    res.redirect('/');
  });


app.listen(port, function() {
  console.log(`app listening on port ${port}`);
});
