import React from 'react';
import { Route, Switch } from 'react-router';
import { Link } from 'react-router-dom';
import { logout } from '../../features/user/userSlice';
import { useAppDispatch } from '../../hooks/store.hooks';
import CharacterDetails from '../../pages/CharacterDetails';
import CharactersList from '../../pages/CharactersList';
import './Layout.css';

export default function Layout () {
  const dispatch = useAppDispatch();

  // Load user if not already loaded?
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <section className="layout d-flex flex-column vh-100">
      <header className="layout__header">
        <Link to="/" ><h1>Rick and Morty FAVs</h1></Link>
        <button className="link" onClick={handleLogout}>Logout</button>
      </header>
      <div className="flex-grow">
        <Switch>
          <Route path='/:id' component={CharacterDetails} />
          <Route path='/' component={CharactersList} />
        </Switch>
      </div>
      <footer className="layout__footer">
        Developed by <em>Un Chango</em>
      </footer>
    </section>
  );
}
