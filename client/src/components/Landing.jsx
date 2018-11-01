import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => (
  <div id='landing'>
    <h1 id='landing-logo' className='logo'>RECI-CALC</h1>
    <div id='landing-box'>
      <span id='landing-text'>Welcome to Hack Reactor's best recipe storage and nutritional calculator</span>
      <Link className='nav link' to='/create'>Create New Recipe</Link>
      <Link className='nav link' to='/recipes'>Recipes</Link>
      <Link className='nav link' to='/search-create'>Search by Ingredient</Link> // todo fix the grid for this button
    </div>
  </div>
);

export default Landing;