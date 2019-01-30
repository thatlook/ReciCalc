import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './Header.jsx';
import Recipes from './recipes/Recipes.jsx';
import SearchCreate from './search/SearchCreate.jsx';
import oneCreate from './create/oneCreate.jsx';
import Landing from './Landing.jsx';

const Main = () => (
  <div id="main">
    {/* Header is outside of the switch so that it is always displayed (except on landing page) */}
    <Header />
    <Switch>
      <Route path="/landing" component={Landing} />
      <Route path="/create" component={oneCreate} />
      {/* Recipes itself is a switch to either recipe list view or individual recipe view */}
      <Route path="/recipes" component={Recipes} />

      <Route path="/search-create" component={SearchCreate} />
      {/* can add a fallback error component: <Route component={ErrorNotFound} /> */}
    </Switch>
  </div>
);

export default Main;
