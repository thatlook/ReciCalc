import React, {Component} from 'react';

class CreateTitle extends Component {
    constructor(props) {
        super(props);
        this.state = {
          title: null,
          isSaved: false
        }
      this.updateTitle = this.updateTitle.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.toggleInput = this.toggleInput.bind(this);
    }

    updateTitle(event){
      this.setState({title: event.target.value});
    }

    toggleInput(){
        this.setState(prevState => ({isSaved: !prevState.isSaved}));
    }

    handleSubmit(event){
      event.preventDefault();
      if (this.state.isSaved) {
        this.toggleInput();
      } else {
        if(this.state.title) {
          this.toggleInput();
          this.props.updateRecipe('title', this.state.title);
        }
      }
    }

    render () {
        return (
          <form id='create-title' onSubmit={this.handleSubmit}>
            <label>
              Recipe title:
              <input type='text' placeholder='recipe title here' onChange={this.updateTitle} disabled={this.state.isSaved}/>
            </label>
            <input className = 'button' type='submit' value={this.state.isSaved ? 'Edit' : 'Save'} />
          </form>)
    }
}

export default CreateTitle;