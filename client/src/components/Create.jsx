import React, {Component} from 'react';
import CreateTitle from './CreateTitle.jsx';
import CreateDescription from './CreateDescription.jsx';

class Create extends Component {
    constructor () {
        super ();
        this.state = {
            title: null,
            description: null,
            ingredients: [],
            instructions: []
        }
        this.updateRecipe = this.updateRecipe.bind(this);
    }


    postRecipe(){
      // pull needed items from state
      // axios call to server to post recipe to database
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
        </div>
      )
    }
}


export default Create;