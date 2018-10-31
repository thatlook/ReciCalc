import React from 'react';
import SearchInput from './SearchInput.jsx';
import SearchList from './SearchList.jsx';
import { getRecipeFromEdamam } from '../../../../helpers/edamamSearch.js';



const EDAMAM_APP_ID = process.env.API_KEY;
const EDAMAM_KEY = process.env.API_KEY;

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ingredients: [],
      ingredient: '',
      searchResults: [],
    }
    this.addIngredient = this.addIngredient.bind(this);
    this.handleIngredientChange = this.handleIngredientChange.bind(this);
    this.deleteIngredient = this.deleteIngredient.bind(this);
    this.submitSearch = this.submitSearch.bind(this);
  }

  handleIngredientChange(e) {
    this.setState({
      ingredient: e.target.value
    })
  }

  addIngredient() {
    let ingredient = this.state.ingredient;
    this.setState(prevState => ({
      ingredients: [...prevState.ingredients, ingredient],
      ingredient: ''
    }))
  }

  deleteIngredient(e) {
    var ingredients = [...this.state.ingredients];
    var index = e.target.name;
    ingredients.splice(index, 1);
    this.setState({
      ingredients: ingredients
    });
  }

  submitSearch() {
    if (this.state.ingredients.length) {
      getRecipeFromEdamam(this.state.ingredients)
    } else {
      alert('please select an ingredient');
    }
    
  }

  render() {
    return (
      <div id='search'>
        <input
          className='button'
          onClick={() => this.submitSearch()}
          type='submit'
          value='Search for Recipes!'
        />
        <SearchInput 
          addIngredient={this.addIngredient}
          ingredient={this.state.ingredient}
          handleIngredientChange={this.handleIngredientChange}
        />
        <SearchList 
          ingredients={this.state.ingredients}
          deleteIngredient={this.deleteIngredient}
        />
      </div>
    )
  }
}

export default Search
