import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthRouteProps from '../../types/authRoutes/AuthRouteProps';

export default function PublicRoute ({ isAuthenticated, component, ...rest }: AuthRouteProps) {
  return (
    <Route
        {...rest}
        render={(props) =>
          isAuthenticated
            ? (<Redirect to={{ pathname: '/' }} />)
            : (React.createElement(component, props))
        }
      />
  );
}
