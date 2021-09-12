import React, { FormEvent, useState } from 'react';
import ErrorMessage from '../../components/ErrorMessage';
import { authenticate, register } from '../../features/user/userSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/store.hooks';
import './Login.scss';

function Login () {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const isLoading = useAppSelector((state) => state.user.isAuthenticating)
  const error = useAppSelector((state) => state.user.authenticationError)
  const dispatch = useAppDispatch();

  const handleSubmition = (event: FormEvent) => {
    event.preventDefault();
    dispatch(authenticate({ username, password }));
  }

  const handleSignUp = (event: FormEvent) => {
    event.preventDefault();
    dispatch(register({ username, password }));
  }

  return (
    <div className="login-container">
      <div className="login">
        <h1 className="login__title">Please Log In</h1>
        <form className="login__form" onSubmit={handleSubmition}>
          <label>
            <p>Username</p>
            <input
              type="text"
              disabled={isLoading}
              autoComplete="current-password"
              onChange={e => setUserName(e.target.value)}
            />
          </label>
          <label>
            <p>Password</p>
            <input
              type="password"
              disabled={isLoading}
              autoComplete="current-password"
              onChange={e => setPassword(e.target.value)}
            />
          </label>
          <div className="login__button-wrapper">
            <button className="btn sign-in" type="submit" disabled={isLoading}>
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
            <button className="btn sign-up" type="button" disabled={isLoading} onClick={handleSignUp}>
            {isLoading ? 'Signing Up...' : 'Sign Up'}
            </button>
          </div>
          {error && <ErrorMessage className="login__error-message" error={error} />}
        </form>
      </div>
    </div>
  );
}

export default Login;
