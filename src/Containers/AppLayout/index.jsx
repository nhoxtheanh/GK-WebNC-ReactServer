import React, { memo } from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';
import Dashboard from '../Dashboard';
import LoginPage from '../Login';
import RegisterPage from '../Register';

export const AppLayout = props => (
  <Switch>
    <Route path="/dashboard"> {/* khai báo route khi truy cập đến URL /dashboard */}
      <Dashboard />
    </Route>
    <Route path="/login">
      <LoginPage />
    </Route>
    <Route path="/register">
      <RegisterPage />
    </Route>
    <Redirect to="/login" /> {/* khi vào trang ko xác định sẽ redirect về /dashboard */}
  </Switch>
);

export default memo(AppLayout);
