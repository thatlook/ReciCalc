import React, {Component} from 'react';

class CreateTitle extends Component {
    constructor(props) {
        super(props);
        this.state = {
          title: null,
          saved: false
        }
      this.updateTitle = this.updateTitle.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.toggleInput = this.toggleInput.bind(this);
    }

    updateTitle(event){
      this.setState({title: event.target.value});
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
        this.props.updateRecipe('title', this.state.title);
      }
    }

    render () {
        return (
          <form id='create-title' onSubmit={this.handleSubmit}>
            <label>
              Recipe title:
              <input type='text' placeholder='recipe title here' onChange={this.updateTitle} disabled={this.state.saved}/>
            </label>
            <input className = 'button' type='submit' value={this.state.saved ? 'Edit' : 'Save'} />
          </form>)
    }
}

export default CreateTitle;