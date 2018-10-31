import React from 'react';
import SearchInput from './SearchInput.jsx';
import SearchList from './SearchList.jsx';

const EDAMAM_APP_ID = process.env.API_KEY;
const EDAMAM_KEY = process.env.API_KEY;

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ingredients: [],
      ingredient: '',
    }
    this.addIngredient = this.addIngredient.bind(this);
    this.handleIngredientChange = this.handleIngredientChange.bind(this);
    this.deleteIngredient = this.deleteIngredient.bind(this);
  }

  handleIngredientChange(e) {
    this.setState({
      ingredient: e.target.value
    })
  }

  addIngredient() {
    let ingredient = this.state.ingredient;
    this.setState(prevState => ({
      ingredients: [...prevState.ingredients, ingredient]
    }))
  }

  deleteIngredient(e) {
    var ingredients = [...this.state.ingredients]; // make a separate copy of the array
    var index = ingredients.indexOf(e.target.value)
    ingredients.splice(index, 1);
    this.setState({
      ingredients: ingredients
    });
  }

  render() {
    return (
      <div id='search'>
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
