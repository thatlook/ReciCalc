import React, {Component} from 'react';
import RecipeListItem from './RecipeListItem.jsx';
import axios from 'axios';
class RecipeList extends Component {
    constructor(){
        super();
        this.state = {
          allRecipes: []
        }
    }

  componentDidMount(){
    // make a get call to database @ api/recipes to retrieve all user recipes and setState
    // placeholder below
    axios.get('api/recipes').then(response => {
      console.log(response);
      this.setState({allRecipes: response.data.map(recipe => {
        return {
          id: recipe.id,
          name: recipe.name,
          description: recipe.description,
          top_ingredients: recipe.top_ingredients
        }
      })})
    })
    .catch(error => {
      console.log('error: ', error);
    })
    // this.setState({allRecipes: [
    //     {
    //       id: 1,
    //       name: 'Hot Juicy Burger',
    //       description: 'this is the hottest juciest burger you ever did see',
    //       top_ingredients: 'ground beef, bun, mayonnaise'
    //     },
    //     {
    //       id: 2,
    //       name: 'Big plate of french fries',
    //       description: 'this is how to make a big plate of french fries',
    //       top_ingredients: 'potatoes, vegetable oil, salt'
    //     }
    // ]});
  }

  render() {
    return (
      <div id='recipe-list'>
        <h2>HERE ARE ALL YOUR DELICIOUS RECIPES: </h2>
        <ul>
          {this.state.allRecipes.map(recipe => <RecipeListItem key={recipe.id} recipe={recipe} />)}
        </ul>
      </div>
    )
  }
}

export default RecipeList;