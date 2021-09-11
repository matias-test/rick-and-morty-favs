import { ComponentClass, FunctionComponent } from 'react';
import { RouteProps } from 'react-router-dom';

export default interface AuthRouteProps extends RouteProps {
  component: FunctionComponent<any> | ComponentClass<any>,
  isAuthenticated: boolean,
}
