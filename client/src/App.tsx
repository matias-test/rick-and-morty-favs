import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// components
import Layout from './components/Layout/Layout';

// pages
import Error from './pages/error/Error';
import Login from './pages/login';

// Auth Routes
import PrivateRoute from './components/authRoutes/PrivateRoute';
import PublicRoute from './components/authRoutes/PublicRoute';

// context
import { ApiClientProvider } from './context/ApiClientProvider';
import { useAppSelector } from './hooks/store.hooks';

function App() {
  const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated)


  return (
    <ApiClientProvider>
        <Router>
          <Switch>
            <PublicRoute path='/login' isAuthenticated={isAuthenticated} component={Login} />
            <PrivateRoute path='/' isAuthenticated={isAuthenticated} component={Layout} />
            <Route component={Error} />
          </Switch>
        </Router>
    </ApiClientProvider>
  );
}

export default App;
