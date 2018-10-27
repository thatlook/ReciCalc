import React, {Component} from 'react';
import CreateTitle from './CreateTitle.jsx';
import CreateDescription from './CreateDescription.jsx';
import CreateIngredients from './CreateIngredients.jsx';
import CreateInstructions from './CreateInstructions.jsx';

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
        this.addNewInstruction = this.addNewInstruction.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
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
      if (this.state.ingredients.every(ingredient => ingredient.isSaved)) {
        let newIngredient = {...this.sampleIngredient, counter: this.counter};
        this.setState(prevState => ({ingredients: prevState.ingredients.concat([newIngredient])}), () => 
          {this.counter++});
      }
    }

    addNewInstruction(){
        if (this.state.instructions.every(instruction => instruction.isSaved)) {
          this.setState(prevState => ({instructions: prevState.instructions.concat([{
              counter: this.counter, text: '', isSaved: false
            }])}), () => {this.counter++});
        }
      }

    deleteItem(stateArray, index){
      this.setState(prevState => ({
        [stateArray]: prevState[stateArray].filter((item, itemIndex) => {
          return itemIndex !== index;
        })}));
    }

    postRecipe(){
      // pull needed items from state
      // ensure that each ingredient isValidated, isSaved, and has a title and description
      // axios call to server to post recipe to database
    }

    render() {
      return (
        <div id='create'>
          <h2>Create a new recipe:</h2>
          <CreateTitle updateRecipe={this.updateRecipe} />
          <CreateDescription updateRecipe={this.updateRecipe} />
          <CreateIngredients 
            ingredients={this.state.ingredients}
            addNewIngredient={this.addNewIngredient}
            updateRecipe={this.updateRecipe}
            deleteItem={this.deleteItem}
          />
          <CreateInstructions
            instructions={this.state.instructions}
            addNewInstruction={this.addNewInstruction}
            updateRecipe={this.updateRecipe}
            deleteItem={this.deleteItem}
          />
        </div>
      )
    }
}


export default Create;