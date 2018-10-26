import React, {Component} from 'react';
import CreateTitle from './CreateTitle.jsx';
import CreateDescription from './CreateDescription.jsx';
import CreateIngredients from './CreateIngredients.jsx';

class Create extends Component {
    constructor () {
        super ();
        this.state = {
            title: null,
            description: null,
            ingredients: [],
            instructions: []
        }
        this.counter = 0;
        this.sampleIngredient = {
            name: '',
            ndbno: '',
            quantity: '',
            isValidated: false,
            isSaved: false,
            nutrition: {},
        }
        this.updateRecipe = this.updateRecipe.bind(this);
        this.addNewIngredient = this.addNewIngredient.bind(this);
        this.deleteIngredient = this.deleteIngredient.bind(this);
    }


    updateRecipe(statePiece, newValue, index, callback) {
      if (!Array.isArray(statePiece)) {
        this.setState({[statePiece]: newValue});
      } else {
          let arrayName = statePiece[0];
          let propertyName = statePiece[1];
          const newStateArray = this.state[arrayName].map((ingredient, ingredientIndex) => {
              if (ingredientIndex !== index) {
                  return ingredient;
              } else {
                  return {...ingredient, [propertyName]: newValue};
              }
          });
          this.setState({[arrayName]: newStateArray}, () => {if (callback) {callback()}});
      }
    }

    addNewIngredient(){
      let newIngredient = {...this.sampleIngredient, counter: this.counter};
      this.setState(prevState => ({ingredients: prevState.ingredients.concat([newIngredient])}), () => {this.counter++;console.log(this.state)});
    }

    deleteIngredient(index){
      this.setState(prevState => ({
        ingredients: prevState.ingredients.filter((ingredient, ingredientIndex) => {
          return ingredientIndex !== index;
        })}), () => console.log(this.state));
    }

    postRecipe(){
      // pull needed items from state
      // ensure that each ingredient isValidated, isSaved, and has a title and description
      // axios call to server to post recipe to database
    }

    render() {
      return (
        <div id='create'>
          <CreateTitle updateRecipe={this.updateRecipe} />
          <CreateDescription updateRecipe={this.updateRecipe} />
          <CreateIngredients 
            ingredients={this.state.ingredients}
            addNewIngredient={this.addNewIngredient}
            updateRecipe={this.updateRecipe}
            deleteIngredient={this.deleteIngredient}
          />
        </div>
      )
    }
}


export default Create;