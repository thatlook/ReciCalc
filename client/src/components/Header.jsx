import React from 'react';
import { Link } from 'react-router-dom';
import Login from './Login.jsx';

const Header = () => {
  return (
    <div id="header">
      <div>
        <Link to="/landing">
          <h1 id="header-logo" className="logo">
            RECI-CALC
          </h1>
        </Link>
      </div>
      <div id="nav-links">
        <span>
          <Link className="nav link" to="/create">
            Create New Recipe
          </Link>
          <Link className="nav link" to="/recipes">
            Recipes
          </Link>
          <Link className="nav link" to="/search-create">
            Search by Ingredients
          </Link>
          {/* <Login /> */}
        </span>
      </div>
    </div>
  );
};
export default Header;
