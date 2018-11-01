import React from 'react';
import {Switch, Route} from 'react-router-dom';
import SearchCreate from './SearchCreate.jsx';
import SearchResults from './SearchResults.jsx';

const Search = () => (
  <Switch>
    <Route exact path='/search-create' component={SearchCreate}/>
    <Route exact path='/search-results' component={SearchResults}/>
  </Switch>
)

export default Search;