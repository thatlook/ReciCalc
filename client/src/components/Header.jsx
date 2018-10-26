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
      return (<div>
        <h1>This is the header. Eventually it will be ~~styled~~</h1>
        <ul>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/create'>Create New Recipe</Link></li>
          <li><Link to='/recipes'>Recipes</Link></li>
        </ul>
      </div>)
  }
}
export default Header;