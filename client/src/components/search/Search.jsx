import React from 'react';
import SearchInput from './SearchInput.jsx'
const EDAMAM_APP_ID = process.env.API_KEY;
const EDAMAM_KEY = process.env.API_KEY;

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ingredients: [],
      
    }
    this.addIngredient = this.addIngredient.bind(this);
  }

  addIngredient() {
    
  }

  render() {
    return (
      <div id='search'>
        <SearchInput />
      </div>
    )
  }
}

export default Search
