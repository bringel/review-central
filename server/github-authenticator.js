import { OAuth2 } from 'oauth'

export class GithubAuthenticator {

  constructor(clientID, clientSecret) {
    this.clientID = clientID;
    this.clientSecret = clientSecret;
  }

  loginUser(code, callback) {
    const client = new OAuth2(this.clientID, this.clientSecret, 'https://github.com', '/login/oauth/authorize', '/login/oauth/access_token');

    client.getOAuthAccessToken(code, {}, function(error, token, refreshToken, results) {
      client.get('https://api.github.com/user', token, function(error, result, response) {
        callback(token, JSON.parse(result));
      })
    });
  }
}
