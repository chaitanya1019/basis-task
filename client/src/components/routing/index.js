import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Authentication from '../auth/Authentication';
import Home from '../pages/Home';

export default ({}) => {
  return (
    <Switch>
      <Route exact path="/login" component={Authentication} />
      <PrivateRoute exact path="/" component={Home} />
    </Switch>
  );
};
