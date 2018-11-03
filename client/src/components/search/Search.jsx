import React from 'react';
import {Switch, Route} from 'react-router-dom';
import SearchCreate from './SearchCreate.jsx';

const Search = () => (
  <Switch>
    <SearchCreate/>
  </Switch>
)

export default Search;