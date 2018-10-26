import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';

// import top-level Route components
import Header from './components/Header.jsx';
import Main from './components/Main.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      // recipeUnderConstruction: {}
    }
  }


  render () {
    return (
      <Router>
        <div className='app'>
          <Header />
          <Main />
        </div>
      </Router>);
  }
}

ReactDOM.render(<App />, document.getElementById('app'));