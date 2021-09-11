import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// pages
import Login from './pages/Login';
import Layout from './components/Layout';
import NotFound from './pages/NotFound';

// Auth Routes
import PrivateRoute from './components/auto-routes/PrivateRoute';
import PublicRoute from './components/auto-routes/PublicRoute';

// context
import { useAppSelector } from './hooks/store.hooks';

function App() {
  const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated)


  return (
    <Router>
      <Switch>
        <PublicRoute path='/login' isAuthenticated={isAuthenticated} component={Login} />
        <PrivateRoute path='/' isAuthenticated={isAuthenticated} component={Layout} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
