import React, {Component} from 'react';

// key
// index
// ingredient

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
    }

    componentDidMount(){
        this.setState({ingredient: this.props.ingredient}, () => console.log(`new ingredient state: ${JSON.stringify(this.state)}`));
    }

    updateUnmatched(event){
      this.setState({unmatchedInput: event.target.value}, () => console.log(this.state.unmatchedInput));
    }

    // when validate button is pressed:
    //   1)check database for possible nameMatches -> update state nameMatches
    //     if user chooses one of these matches:
    //       update state -> ingredient name and NDBNO
    //                    -> reset unmatchedInput to null
    //                    -> isValidate to true
    //   2)if none match, make call to API and update state nameMatches with new items from API call (limit?)
    //     if user chooses one of these matches:
    //         update state -> ingredient name and NDBNO
    //                      -> reset unmatchedInput to null
    //                      -> isValidate to true
    //   3)repeat step 2 as needed until match is found





    handleSubmit(event){
      event.preventDefault();
      console.log('submit called');
    } 

    render(){
      return (
        <div className='ingredient-input'>
          <form className='ingredient-info' onSubmit={this.handleSubmit}>
            <input className='name' type='text' placeholder='Ingredient name' onChange={this.updateUnmatched} disabled={this.state.isSaved}/>
            <input className='quantity' type='text' placeholder='Quantity' disabled={this.state.isSaved}/>
            <span>grams</span>
            <input className='button' type='submit' value={this.state.isSaved ? 'Edit' : 'Save'} />
            <input className='button' type='button' value='Delete' />
          </form>
          <div className='validate' hidden={!this.state.unmatchedInput}>
            This will be validation section
          </div>
        </div>)
    }
}

export default IngredientInput;