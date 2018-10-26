import React, {Component} from 'react';

class CreateDescription extends Component {
    constructor(props) {
        super(props);
        this.state = {
          description: null,
          isSaved: false
        }
      this.updateDescription = this.updateDescription.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.toggleSaved = this.toggleSaved.bind(this);
    }

    updateDescription(event){
      this.setState({description: event.target.value});
    }

    toggleSaved(){
        this.setState(prevState => ({isSaved: !prevState.isSaved}));
    }

    handleSubmit(event){
      event.preventDefault();
      if (this.state.isSaved) {
        this.toggleSaved();
      } else {
        if(this.state.description) {
          this.toggleSaved();
          this.props.updateRecipe(event.target.name, this.state.description);
        }
      }
    }

    render () {
        return (
          <form id='create-description' name='description' onSubmit={this.handleSubmit}>
            <label>
              Recipe description:
              <textarea placeholder='recipe description here' onChange={this.updateDescription} disabled={this.state.isSaved}/>
            </label>
            <input className='button' type='submit' value={this.state.isSaved ? 'Edit' : 'Save'} />
          </form>)
    }
}

export default CreateDescription;