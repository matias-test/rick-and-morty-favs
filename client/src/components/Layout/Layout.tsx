import React from 'react';
import { Route, Switch } from 'react-router';
import CharacterDetails from '../../pages/CharacterDetails';
import CharactersList from '../../pages/CharactersList';
import './Layout.css';

export default function Layout () {
  // Load user if not already loaded
  return (
    <section className="layout d-flex flex-column vh-100">
      <header className="layout__header">
        <h1>Rick and Morty FAVs</h1>
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
