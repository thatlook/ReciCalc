import React, {Component} from 'react';
import RecipeListItem from './RecipeListItem.jsx';

class RecipeList extends Component {
    constructor(){
        super();
        this.state = {
          allRecipes: []
        }
    }

  componentDidMount(){
    // make a call to database to get @ api/recipes to retrieve all recipes
    this.setState({allRecipes: [
        {
          id: 1,
          title: 'Hot Juicy Burger',
          description: 'this is the hottest juciest burger you ever did see'
        },
        {
          id: 2,
          title: 'Big plate of french fries',
          description: 'this is how to make a big plate of french fries'
        }
    ]});
  }

  render() {
    return (
      <div>
        <span>HERE ARE ALL YOUR DELICIOUS RECIPES</span>
        <ul>
          {this.state.allRecipes.map(recipe => <RecipeListItem key={recipe.id} recipe={recipe} />)}
        </ul>
      </div>
    )
  }
}

export default RecipeList;