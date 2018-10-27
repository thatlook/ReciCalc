import React, {Component} from 'react';

class IngredientInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
          nameMatches: [],
          isValidating: false,
          currentOffset: 0
        }
        this.handleChange = this.handleChange.bind(this);
        this.validate = this.validate.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }

    handleChange(event){
      const {updateRecipe, index, ...rest} = this.props;
      updateRecipe(['ingredients', event.target.name], event.target.value, index);
    }

    validate(userInputtedFoodWord) {
      const {updateRecipe, index, ...rest} = this.props;
      if (!this.state.isValidating) {
          this.setState({nameMatches: ['ham', 'more ham', 'extra extra ham']})
          this.setState({isValidating: true})
          // above call is hardcoded, obviously
          // make call to database
            // call to database should come from a helper function that lives on this component
            // objects will contain the name, the ndbno, and the nutritional content
            // set nameMatches to (objects right) representing the possible matches, is Validating to true 
              // if array returned from database call is empty, need to make call to API
                // this call should come from another helper function that lives on the component?
                // set state with possible matches, change is Validating to true
      } else {
       // make this its own helper function to update ingredient object with ingredient information
       // change below hardcoded values to correct ndbno and nutritionObject
      updateRecipe(['ingredients', 'ndbno'], '82930', index, () => 
        updateRecipe(['ingredients', 'nutrition'], {'thisIs': 'nutritionObject'}, index, () => 
          updateRecipe(['ingredients', 'isValidated'], true, index)));
        // check confirmation call
          // if confirmation call reads 'none of the above', make call to api to get searches from ndb at current offset
          // update current offset by whatever amount
        // else if confirmation call reads a name
          // call helper function to make api call to get nutrient information
          // put that nutrient information in database
          // update state of ingredient object with ingredient information
      }

    }

    // make this its own helper function to update ingredient object with ingredient information
    // change below hardcoded values to correct ndbno and nutritionObject
    //   updateRecipe(['ingredients', 'ndbno'], '82930', index, () => 
    //     updateRecipe(['ingredients', 'nutrition'], {'thisIs': 'nutritionObject'}, index, () => 
    //       updateRecipe(['ingredients', 'isValidated'], true, index)));

    handleSave(){
      const {ingredient, updateRecipe, index, ...rest} = this.props;
      if (ingredient.quantity && ingredient.isValidated) {
        updateRecipe(['ingredients', 'isSaved'], true, index);
      } else {
        alert('please ensure that ingredient is validated and quantity is entered');
      }
    }

    render(){
      const {ingredient, index, deleteIngredient, ...rest} = this.props;

      return (
        <div className='ingredient-input'>
          <div className='ingredient-info'>
            <input className='name' type='text' name='name' placeholder='Ingredient name' 
              onChange={this.handleChange} 
              value={ingredient.name} 
              disabled={ingredient.isValidated}
            />
            <input className='quantity' type='number' name='quantity' placeholder='Quantity' 
              onChange={this.handleChange} 
              value={ingredient.quantity} 
              disabled={ingredient.isSaved}
            />
            <span>grams</span>
            <input className='button' type='submit' value='Save' 
              disabled={ingredient.isSaved} 
              onClick={this.handleSave}
            />
            <input className='button' type='button' value='Delete' 
              onClick={() => deleteIngredient(index)}
            />
          </div>
          <div className='ingredient-validate' hidden={ingredient.isValidated}>
            <input className='button' type='button' 
              value={this.state.isValidating ? 'Confirm' : 'Validate'} 
              onClick={() => this.validate()}
            />
            <select className='select'>
              <option value=''>--Please choose an item to validate--</option>
                {this.state.nameMatches.map(nameMatch => <option value={nameMatch} key={nameMatch}>{nameMatch}</option>)}
              <option value='None of the above'>--None of the above--</option>
            </select>
          </div>
        </div>)
    }
}

export default IngredientInput;