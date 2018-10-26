import React, {Component} from 'react';

// key
// index
// ingredient
// saveIngredient
// deleteIngredient

class IngredientInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
          ingredient: null, 
            // starts blank, set in didMount ({name: ''})
            // will add information from matched ingredient once validated -> name, NDBNO
            // will add quantity once entered
            // will add isSaved once saved
          unmatchedInput: null,
          nameMatches: [],
          isValidated: false,
          isSaved: false
        }
        this.updateUnmatched = this.updateUnmatched.bind(this);
        this.updateQuantity = this.updateQuantity.bind(this);
        this.validate = this.validate.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }

    componentDidMount(){
      this.setState({ingredient: this.props.ingredient}, () => console.log(`new ingredient state: ${JSON.stringify(this.state)}`));
      // if ingredient has already been saved and is being re-rendered after a addition/deletion of other ingredient, 
      // need to se isValidated to true and isSaved to true
    }

    toggleSaved(){
      this.setState(prevState => ({isSaved: !prevState.isSaved}));
    }

    updateUnmatched(event){
      this.setState({unmatchedInput: event.target.value, isValidated: false}, () => console.log(this.state));
    }

    updateQuantity(event) {
      let oldIngredient = this.state.ingredient;
      this.setState({ingredient: {...oldIngredient, quantity: event.target.value}}, () => console.log(this.state));
    }

    validate(name = this.state.unmatchedInput, nbdno = this.props.index) {
      let oldIngredient = this.state.ingredient;
      this.setState({ingredient: {...oldIngredient, name, nbdno}, unmatchedInput: null, isValidated: true}, () => console.log(this.state));
      // this is for testing purposes, see below for real logic of validation
    }

    // when validate button is pressed:
    //   DO WE PROVIDE OPTION TO NOT VALIDATE? like for spices, etc.
    //   WHAT WOULD THAT LOOK LIKE IN THE DATABASE??
    //   SINCE WE USE THE NDBNO for the id, these ingredients could not exist in rec/ingred junciton table
    //   do we make a different table for unvalidated ingredients???
    //
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


    handleSave(){
      console.log('submit called');
      if (this.state.isSaved === false) {
        if (!this.state.isValidated) {
          alert('please validate ingredient before saving');
        } else if (!this.state.ingredient.quantity) {
          alert('quantity must be a number');
        } else {
          this.setState(prevState => ({...prevState, ingredient: {...prevState.ingredient, isSaved: true}}), () => console.log(this.state))
          this.toggleSaved();
          this.props.saveIngredient(this.props.index, this.state.ingredient);
        }
      }
      // else we are trying to edit an existing ingredient
    }

    render(){
      return (
        <div className='ingredient-input'>
          <div className='ingredient-info' >
            <input className='name' type='text' placeholder='Ingredient name' onChange={this.updateUnmatched} disabled={this.state.isSaved}/>
            <input className='quantity' type='number' placeholder='Quantity' onChange={this.updateQuantity} disabled={this.state.isSaved}/>
            <span>grams</span>
            <input className='button' type='submit' value={this.state.isSaved ? 'Edit' : 'Save'} onClick={this.handleSave}/>
            <input className='button' type='button' value='Delete' onClick={() => this.props.deleteIngredient(this.props.index)}/>
          </div>
          <div className='validate' hidden={!this.state.unmatchedInput}>
            <input className='button' type='button' value='Validate' onClick={() => this.validate()}/>
            Validation match possibilities will go here
          </div>
        </div>)
    }
}

export default IngredientInput;