import React, {Component} from 'react';

//receives key/index from 



class IngredientInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // lots to come here
        }
    }

    componentDidMount(){
        this.setState({ingredient: this.props.ingredient})
        // puts this blank ingredient in state. actions by user will update this state
        // when user saves the ingredient, we will use a function passed down from create parent to update the 
        // parent state based on the index right
    }

    // 

    render(){
      return (
        <div>
          <label>
            Recipe title:
            <input type='text' placeholder='recipe title here' onChange={this.updateTitle} disabled={this.state.saved}/>
         </label>
         <input className = 'button' type='submit' value={this.state.saved ? 'Edit' : 'Save'} />
        </div>)
    }
}

export default IngredientInput;