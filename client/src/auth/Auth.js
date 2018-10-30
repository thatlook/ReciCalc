import auth0 from 'auth0-js';

export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: 'rocket-turtles.auth0.com',
    clientID: 'Zi98h1wvF3hpE6aTHPf663zi1U75PFZ1',
    redirectUri: 'http://localhost:3000/callback',
    responseType: 'token id_token',
    scope: 'openid'
  });

  login() {
    this.auth0.authorize();
  }
}