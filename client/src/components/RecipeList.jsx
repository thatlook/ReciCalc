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
      //console.log(response);
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
  }

  deleteRecipe() {
    console.log('delete last recipe clicked');
    // console.log(this.state.allRecipes);
  }

  render() {
    return (
      <div id='recipe-list'>
        <h3>Saved Recipes: </h3>
        <input type="submit" value="delete last recipe" onClick={this.deleteRecipe} />
        <ul>
          {this.state.allRecipes.map(recipe => <RecipeListItem key={recipe.id} recipe={recipe} />)}
        </ul>
      </div>
    )
  }
}

export default RecipeList;