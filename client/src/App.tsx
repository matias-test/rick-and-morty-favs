import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

// components
import Layout from './components/Layout/Layout';

// pages
import Error from './pages/error/Error';
import Login from './pages/login';

// Auth Routes
import PrivateRoute from './components/authRoutes/PrivateRoute';
import PublicRoute from './components/authRoutes/PublicRoute';

// context
import { UserProvider, useUserState } from './context/UserContext';

function App() {
  // global
  const { isAuthenticated } = useUserState();

  return (
    <UserProvider>
      <Router>
        <Switch>
          <PublicRoute path='/login' isAuthenticated={isAuthenticated} component={Login} />
          <PrivateRoute path='/' isAuthenticated={isAuthenticated} component={Layout} />
          <Route component={Error} />
        </Switch>
      </Router>
    </UserProvider>
  );
}

export default App;
