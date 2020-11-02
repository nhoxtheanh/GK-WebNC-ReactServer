import React, { memo } from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';
import Dashboard from '../Dashboard';

export const AppLayout = props => (
  <Switch>
    <Route path="/dashboard"> {/* khai báo route khi truy cập đến URL /dashboard */}
      <Dashboard />
    </Route>
    <Redirect to="/dashboard" /> {/* khi vào trang ko xác định sẽ redirect về /dashboard */}
  </Switch>
);

export default memo(AppLayout);
