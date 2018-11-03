import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
  <div id='header'>
    <h1 id='header-logo' className='logo'>RECI-CALC</h1>
    <div id='nav-links'>
      <Link className='nav link' to='/create'>Create New Recipe</Link>
      <Link className='nav link' to='/recipes'>Recipes</Link>
      <Link className='nav link' to='/search-create'>Search by Ingredients</Link>
    </div>
  </div>)
}
export default Header;