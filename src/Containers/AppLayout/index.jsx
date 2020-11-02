import React, { memo } from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';
import Dashboard from '../Dashboard';

export const AppLayout = props => (
  <Switch>
    <Route path="/dashboard">
      <Dashboard />
    </Route>
    <Redirect to="/dashboard" />
  </Switch>
);

export default memo(AppLayout);
