import React, {Component} from 'react';

class IngredientInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
          nameMatches: [],
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
    //   Will we provide use an option in the select menu
    //   1)check database for possible nameMatches -> update state nameMatches
    //     if user chooses one of these matches:
    //       update state -> ingredient name and NDBNO
    //                    -> reset unmatchedInput to null
    //                    -> isValidate to true (will change validate button to read 'edit')
    //   2)if none match, make call to API and update state nameMatches with new items from API call (limit?)
    //     if user chooses one of these matches:
    //         update state -> ingredient name and NDBNO
    //                      -> reset unmatchedInput to null
    //                      -> isValidate to true (will change validate button to read 'edit')
    //         make call to API to get nutritional info of ingredient with given NDBNO and add to database
    //   3)repeat step 2 as needed until match is found
      
      // change below hardcoded values to correct ndbno and nutritionObject
      updateRecipe(['ingredients', 'ndbno'], '82930', index, () => 
        updateRecipe(['ingredients', 'nutrition'], {'thisIs': 'nutritionObject'}, index, () => 
          updateRecipe(['ingredients', 'isValidated'], true, index)));
    }

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
            <input className='button' type='submit' value='Save' disabled={ingredient.isSaved} onClick={this.handleSave}/>
            <input className='button' type='button' value='Delete' onClick={() => deleteIngredient(index)}/>
          </div>
          <div className='validate' hidden={ingredient.isValidated}>
            <input className='button' type='button' value='Validate' onClick={() => this.validate()}/>
            Validation match possibilities will go here
            {/* <select name="" id="">
               namematches.map to options
               click

            </select> */}
          </div>
        </div>)
    }
}

export default IngredientInput;