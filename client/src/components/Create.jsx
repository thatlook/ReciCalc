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
            ingredients: [{name: ''}],
            instructions: [{text: ''}]
        }
        this.updateRecipe = this.updateRecipe.bind(this);
    }


    postRecipe(){
      // pull needed items from state
      // filter ingredients and instructions for saved items?
      // axios call to server to post recipe to database
    }



    addIngredient(){
      // function to render additional ingredient or instruction
      // pass it down as a prop to each of those componenets
    }
    // reference exampe below
    // handleAddShareholder = () => {
    //   this.setState({
    //     shareholders: this.state.shareholders.concat([{ name: '' }])
    //   });
    // }








    removeIngredient(){

    }

    addInstruction(){
        // function to render additional ingredient or instruction
        // pass it down as a prop to each of those componenets
      }


    updateRecipe(statePiece, newValue){
        console.log(statePiece, newValue);
        this.setState({[statePiece]: newValue}, () => console.log(this.state));
    }

    render() {
      return (
        <div id='create'>
          <CreateTitle updateRecipe={this.updateRecipe} />
          <CreateDescription updateRecipe={this.updateRecipe} />
          <CreateIngredients ingredients={this.state.ingredients}/>
        </div>
      )
    }
}


export default Create;