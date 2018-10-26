import React, {Component} from 'react';

class CreateDescription extends Component {
    constructor(props) {
        super(props);
        this.state = {
          description: null,
          saved: false
        }
      this.updateDescription = this.updateDescription.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.toggleInput = this.toggleInput.bind(this);
    }

    updateDescription(event){
      this.setState({description: event.target.value});
    }

    toggleInput(){
        this.setState(prevState => ({saved: !prevState.saved}));
    }

    handleSubmit(event){
      event.preventDefault();
      if (this.state.saved) {
        this.toggleInput();
      } else {
        this.toggleInput();
        this.props.updateRecipe('description', this.state.description);
      }
    }

    render () {
        return (
          <form id='create-description' onSubmit={this.handleSubmit}>
            <label>
              Recipe description:
              <textarea placeholder='recipe description here' onChange={this.updateDescription} disabled={this.state.saved}/>
            </label>
            <input className = 'button' type='submit' value={this.state.saved ? 'Edit' : 'Save'} />
          </form>)
    }
}

export default CreateDescription;