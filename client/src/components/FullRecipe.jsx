import React, {Component} from 'react';

class FullRecipe extends Component {
  constructor(props) {
      super(props);
      this.state = {
          // recipe: {}
          // will keep full recipe information in here once pulled from database
      }
      //this.dummyrecipe
  }

  componentDidMount() {
      //make call to database for particular recipe
  }

  render () {

    // if state.recipe is null, render an error message of some sort <div>error recipe not found</div>, else
      return (
        <div>
          WILL RENDER FULL RECIPE FOR RECIPE WITH ID NUMBER : {this.props.match.params.id}
        </div>
      )
  }

}

export default FullRecipe;