import React from 'react';
import axios from 'axios';
import SearchInput from './SearchInput.jsx';
import SearchList from './SearchList.jsx';
import { Link } from 'react-router-dom';
import { getRecipeFromEdamam } from '../../../../server/routes/search.js';

const EDAMAM_APP_ID = process.env.API_KEY;
const EDAMAM_KEY = process.env.API_KEY;

class SearchCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredients: [],
      ingredient: '',
      searchResults: [{
        title: 'Peanut Butter Banana Smoothie Recipe',
        image: 'https://www.edamam.com/web-img/90b/90bdb6373111199cca741fc422ac3c28.jpg',
        labels: ["Vegetarian", "Tree-Nut-Free", "Alcohol-Free"], //need to concat dietLables and healthLabels
        ingredientsLines: ["1/2 banana", "1 tablespoon natural peanut butter", "1 cup ice cold skim milk"],
        calories: 233.61649999999997,
        totalFat: 0,
        satFat: 0,
        cholesterol: 0,
        totalCarbs: 0,
        sugar: 0,
        fiber: 0,
        protein: 0,
      }],
    };
    this.addIngredient = this.addIngredient.bind(this);
    this.handleIngredientChange = this.handleIngredientChange.bind(this);
    this.deleteIngredient = this.deleteIngredient.bind(this);
    this.submitSearch = this.submitSearch.bind(this);
  }

  handleIngredientChange(e) {
    this.setState({
      ingredient: e.target.value,
    })
  }

  addIngredient() {
    const ingredient = this.state.ingredient;
    this.setState(prevState => ({
      ingredients: [...prevState.ingredients, ingredient],
      ingredient: ''
    }))
  }

  deleteIngredient(e) {
    let ingredients = [...this.state.ingredients];
    let index = e.target.name;
    ingredients.splice(index, 1);
    this.setState({
      ingredients: ingredients
    });
  }

  submitSearch() {
    if (this.state.ingredients.length) {
      axios.get('/api/search', {
        params: {
          ingredients: this.state.ingredients
        }
      })
      .then(res => {
        console.log('res on client from get search is ', res)
      })
      .catch(err => {
        console.log('error on client from get search is ', err);
      })
      // getRecipeFromEdamam(this.state.ingredients)
      // .then(res => {
      //   console.log(JSON.stringify(res.data));
      // }) //todo format incoming data then setState
      // .then() //todo figure out how to link to new route link
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

export default SearchCreate;