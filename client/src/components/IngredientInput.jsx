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
          unmatchedInput: null,
          //track unmatched input here or in parent component
          nameMatches: [],
        }

        //ingredient in props:
            // starts blank, set in didMount ({name: ''})
            // will add information from matched ingredient once validated -> name, NDBNO
            // will add quantity once entered
            // will add isSaved once saved
        this.updateUnmatched = this.updateUnmatched.bind(this);
        this.updateQuantity = this.updateQuantity.bind(this);
        this.validate = this.validate.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }

    componentDidMount(){
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
    //  have select element automatically render when there is unmatched input and just use validate button to validate?
    //  let oldIngredient = this.state.ingredient;
    //  this.setState({ingredient: {...oldIngredient, name, nbdno}, unmatchedInput: null, isValidated: true}, () => console.log(this.state));
    //  this is for testing purposes, see below for real logic of validation
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
      const {ingredient, ...rest} = this.props;

      return (
        <div className='ingredient-input'>
          <div className='ingredient-info' >
            <input className='name' type='text' placeholder='Ingredient name' onChange={this.updateUnmatched} value={ingredient.name} disabled={ingredient.isSaved}/>
            <input className='quantity' type='number' placeholder='Quantity' onChange={this.updateQuantity} value={ingredient.quantity} disabled={ingredient.isSaved}/>
            <span>grams</span>
            <input className='button' type='submit' value={this.state.isSaved ? 'Edit' : 'Save'} onClick={this.handleSave}/>
            <input className='button' type='button' value='Delete' />
          </div>
          <div className='validate' hidden={!this.state.unmatchedInput}>
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


//onClick={() => this.props.deleteIngredient(this.props.index)

export default IngredientInput;