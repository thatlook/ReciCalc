import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => (
  <div id='home'>
      {'Know what you\'re putting in your body ;)'}
      <div>
        <Link className='nav link' to='/create'>Create New Recipe</Link>
        <Link className='nav link' to='/recipes'>Recipes</Link>
      </div>
  </div>
);

export default Landing;