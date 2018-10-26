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
        this.addIngredient = this.addIngredient.bind(this);
    }


    postRecipe(){
      // pull needed items from state
      // filter ingredients and instructions for saved items (not the dummy starter objects)?
      // axios call to server to post recipe to database
    }



    addIngredient(event){
      this.setState(prevState => ({ingredients: prevState.ingredients.concat([{name: ''}])}), () => console.log(this.state));
    }

    removeIngredient(){

    }
   // reference below
    // handleRemoveShareholder = (idx) => () => {
    //     this.setState({
    //       shareholders: this.state.shareholders.filter((s, sidx) => idx !== sidx)
    //     });
    //   }


    editIngredient(){

    }
//reference below
    // handleShareholderNameChange = (idx) => (evt) => {
    //     const newShareholders = this.state.shareholders.map((shareholder, sidx) => {
    //       if (idx !== sidx) return shareholder;
    //       return { ...shareholder, name: evt.target.value };
    //     });
    
    //     this.setState({ shareholders: newShareholders });
    //   }


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
          <CreateIngredients 
            ingredients={this.state.ingredients}
            addIngredient={this.addIngredient}
          />
        </div>
      )
    }
}


export default Create;