import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './Header.jsx';
import Create from './Create.jsx';
import Recipes from './Recipes.jsx';

const Main = () => (
  <div id='main'>
    <Header />
    <Switch>
      <Route path='/create' component={Create} />
      <Route path='/recipes' component={Recipes} />
      {/* <Route component={ErrorNotFound} /> */}
    </Switch>
  </div>
)

export default Main;