import React from 'react';
import Auth0Lock from 'auth0-lock';
import auth0_config from '../../../auth0_config.js';

let options = {
  languageDictionary: {
    title: 'Rocket Turtles'
  },
  // auth: {
  //   redirectUrl: 'http://localhost:3000/create'
  // }
};

let lock = new Auth0Lock(auth0_config.clientID, auth0_config.domain, options);
// Listening for the authenticated event
lock.on("authenticated", function(authResult) {
  // Use the token in authResult to getUserInfo() and save it to localStorage
  lock.getUserInfo(authResult.accessToken, function(err, profile) {
    if (err) {
      console.error('GET USER INFO ERROR', err);
    }
    localStorage.setItem('accessToken', authResult.accessToken);
  });
});

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      login: false
    }
    this.logout = this.logout.bind(this);
  }
  
  logout() {
    localStorage.removeItem('accessToken');
    lock.logout({'returnTo':'http://localhost:3000'});
  }

  renderLoginLogout() {
    if (localStorage.accessToken) {
      return (
        <button className='nav link' onClick={()=>this.logout()}>Logout</button>
      )
    } else {
      return (
        <button className='nav link' onClick={()=>lock.show()}>Login</button>
      )
    }
  }

  render() {
    return (
      <div>
        {this.renderLoginLogout()}
      </div>
    )
  }
}

export default Login;