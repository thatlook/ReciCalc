import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './Header.jsx';
import Create from './create/Create.jsx';
import Recipes from './recipes/Recipes.jsx';
import SearchCreate from './search/SearchCreate.jsx'
import SearchResults from './search/SearchResults.jsx'
import Search from './search/Search.jsx'


const Main = () => (
  <div id='main'>
    {/* Header is outside of the switch so that it is always displayed (except on landing page) */}
    <Header />
    <Switch>
      <Route path='/create' component={Create} />
      {/* Recipes itself is a switch to either recipe list view or individual recipe view */}
      <Route path='/recipes' component={Recipes} />
      {/* <Route path='/search' component={Search} /> */}
      <Route path='/search-create' component={SearchCreate} />
      <Route path='/search-results' component={SearchResults} />
      {/* can add a fallback error component: <Route component={ErrorNotFound} /> */}
    </Switch>
  </div>
)

export default Main;