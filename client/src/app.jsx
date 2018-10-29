import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

// import top-level Route components
import Landing from './components/Landing.jsx';
import Main from './components/Main.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      // keep copy of Create view state here in case user leaves page and returns without submitting
      // recipeUnderConstruction: {}
    }
  }


  render () {
    return (
      <Router>
          <Switch>
            <Route exact path = '/' component={Landing} />
            <Route component={Main} />
          </Switch>
      </Router>);
  }
}

ReactDOM.render(<App />, document.getElementById('app'));