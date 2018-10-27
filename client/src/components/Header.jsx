import React, {Component} from 'react';
import { Link } from 'react-router-dom';

// refactor to functional component?
class Header extends Component {
  constructor() {
      super();
      this.state = {
        // does this need to be a class component?
      }
  }

  render () {
      return (
      <div id='header'>
        <h1 id='logo'>This is the header. Eventually it will be ~~styled~~</h1>
        <div id='nav-links'>
          <Link className='nav link' to='/'>Home</Link>
          <Link className='nav link' to='/create'>Create New Recipe</Link>
          <Link className='nav link' to='/recipes'>Recipes</Link>
        </div>
      </div>)
  }
}
export default Header;