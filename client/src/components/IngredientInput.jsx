import React, {Component} from 'react';
const axios = require('axios')
class IngredientInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
          nameMatches: [],
          isValidating: false,
          currentOffset: 0,
          currentSelection: '',
          //from database: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.validate = this.validate.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.getNdbno = this.getNdbno.bind(this);
        this.updateSelection = this.updateSelection.bind(this);
        this.getFromDB = this.getFromDB.bind(this);
    }

    handleChange(event){
      const {updateRecipe, index, ...rest} = this.props;
      updateRecipe(['ingredients', event.target.name], event.target.value, index);
    }

    updateSelection(event){
      let updateObject = this.state.nameMatches.filter(nameMatch => nameMatch.name === event.target.value)[0];
      this.setState({currentSelection: updateObject}, () => console.log(this.state));
    }

    getNdbno(query){
      axios.get('api/ingredients/usda', {
        params: {
          searchTerm: `${query}`,
          page: this.state.currentOffset
        }
      })
      .then((data) => {
        const list = data.data.map((item, i) => {
          return {name : item.name, ndbno: item.ndbno}; 
        });
        this.setState({nameMatches: list}); // adjust this to update current offset
        //console.log(`${data.config.params.query} successfully searched: `,list);
        console.log('name matches: ',this.state.nameMatches);
      })
      .catch(error => {
        throw(error)
      });    
    }

    getFromDB(query){
      axios.get('api/ingredients', {
        params: {
          searchTerm : `${query}`
        }
      })
        .then(data => {
          const list = data.data.map((item, i) => {
            return {name : item.name, ndbno: item.ndbno}; 
          });
          this.setState({nameMatches: list});
          console.log('name matches from database: ',this.state.nameMatches);
        })
        .catch(error => {
          console.log('error: error while searching in database', error)
        })
    }

    validate() {
      const {ingredient, updateRecipe, index, ...rest} = this.props;
      //console.log(this.props);
      if (!this.state.isValidating) {
        this.setState({isValidating: true})
        this.getFromDB(ingredient.name);
        if(this.state.nameMatches.length === 0) {
          this.getNdbno(ingredient.name);
        }
      } else {
        if (!(this.state.currentSelection === 'none of the above' || this.state.currentSelection === '')) {
          let selection = this.state.currentSelection
          this.finalValidation(selection.ndbno, selection.name);
          // make call to server to fetch nutrition information for given ndbno of currentSelection and add to database
        } else if (this.state.currentSelection === 'none of the above') {
          this.getNdbno(ingredient.name); //with updated offset...
        }
      }

    }

    finalValidation(ndbno = 99999, name = 'hot ham'){
      const {updateRecipe, index, ...rest} = this.props;
      updateRecipe(['ingredients', 'name'], name, index, () => 
        updateRecipe(['ingredients', 'ndbno'], ndbno, index, () => 
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
            <select name="select" className='select' onChange={this.updateSelection}>
              <option value=''>--Please choose an item to validate--</option>
                {this.state.nameMatches.map((nameMatch, i) => <option object={nameMatch} value={nameMatch.name} key={i}>{nameMatch.name}</option>)}
              <option value='none of the above'>--None of the above--</option>
            </select>
          </div>
        </div>)
    }
}
export default IngredientInput;