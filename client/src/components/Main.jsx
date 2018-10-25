import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './Home.jsx';
import Create from './Create.jsx';
import Recipes from './Recipes.jsx';

const Main = () => (
  <Switch>
    <Route exact path='/' component={Home} />
    <Route path='/create' component={Create} />
    <Route path='/recipes' component={Recipes} />
    {/* <Route component={ErrorNotFound} /> */}
  </Switch>
)

export default Main;