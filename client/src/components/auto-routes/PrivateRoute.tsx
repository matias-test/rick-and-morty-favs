import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthRouteProps from '../../types/authRoutes/AuthRouteProps';

export default function PrivateRoute ({ isAuthenticated, component, ...rest }: AuthRouteProps) {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated
          ? React.createElement(component, props)
          : (
            <Redirect
              to={{
                pathname: '/login',
                state: {
                  from: props.location
                }
              }}
            />
            )
      }
    />
  );
}
