const OAuth2 = require('oauth').OAuth2;

class GithubAuthenticator {

  constructor(clientID, clientSecret, callbackURL) {
    this.clientID = clientID;
    this.clientSecret = clientSecret;
    this.callbackURL = callbackURL;
  }

  loginUser(code, callback) {
    const client = new OAuth2(this.clientID, this.clientSecret, 'https://github.com', '/login/oauth/authorize', '/login/oauth/access_token');

    client.getOAuthAccessToken(code, {}, function(error, token, refreshToken, results) {
      client.get('https://api.github.com/user', token, function(error, result, response) {
        callback(token, result);
      })
    });
  }
}

module.exports = GithubAuthenticator;
