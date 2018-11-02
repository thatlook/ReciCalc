import React from 'react';
import { Link } from 'react-router-dom';
import Auth0Lock from 'auth0-lock';
import auth0_config from '../../../auth0_config.js';

let options = {
  languageDictionary: {
    title: 'Rocket Turtles'
  }
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
    localStorage.setItem('profile', JSON.stringify(profile));

    // don't bring these console logs to the deployed version
    console.log(profile);
    console.log(localStorage)
  });
});

const Landing = () => (
  <div id='landing'>
    <h1 id='landing-logo' className='logo'>RECI-CALC</h1>
    <div id='landing-box'>
      <span id='landing-text'>Welcome to Hack Reactor's best recipe storage and nutritional calculator</span>
      <Link className='nav link' to='/create'>Create New Recipe</Link>
      <Link className='nav link' to='/recipes'>Recipes</Link>
      <Link className='nav link' to='/search-create'>Search by Ingredient</Link>
      <button className='nav link' onClick={()=>lock.show()}>Login</button>
    </div>
  </div>
);

export default Landing;