import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import CreateTitle from './CreateTitle.jsx';
import CreateDescription from './CreateDescription.jsx';
import CreateIngredients from './CreateIngredients.jsx';
import CreateInstructions from './CreateInstructions.jsx';
import axios from 'axios';

class Create extends Component {
    constructor () {
        super ();
        this.state = {
            title: null,
            description: null,
            ingredients: [],
            instructions: [],
            submitted: false
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
        this.postRecipe = this.postRecipe.bind(this);
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

    // have postRecipe take user to RecipeList view??
    postRecipe(){

      let isValidRecipe = true;
      if(typeof this.state.title !== 'string' || this.state.title.trim().length === 0) {
        isValidRecipe = false;
      }
      this.state.ingredients.forEach(ing => {
        if (ing.isSaved === false) {
          isValidRecipe = false;
        }
      });
      this.state.instructions.forEach(inst => {
        if (inst.isSaved === false) {
          isValidRecipe = false;
        }
      });
      if (isValidRecipe) {
        const recipe = Object.assign({}, this.state);
        recipe.instructions = this.state.instructions.map(obj => obj.text);
        console.log(recipe);
        axios.post('api/recipes', {recipe})
          .then(response => {
            console.log(response);
            this.props.history.push(`/recipes/${response.data.newRecipeId}`);
          })
          .catch(err => {
            console.error(err);
          })
      } else {
        alert('Please make sure all ingredients and instructions are saved and title exists')
      }
    }

    render() {
      return (
        <div id='create'>
          <h2>What's cookin'?</h2>
          <span id='recipe-submit' className='button' onClick={this.postRecipe} disabled={this.state.submitted}>SAVE RECIPE</span>
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


export default withRouter(Create);