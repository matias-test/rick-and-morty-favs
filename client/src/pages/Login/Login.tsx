import React, { FormEvent, useState } from 'react';
import { authenticate } from '../../features/user/userSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/store.hooks';

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

  return (
    <div className="login-wrapper">
      <h1>Please Log In</h1>
      <form onSubmit={handleSubmition}>
        <label>
          <p>Username</p>
          <input type="text" disabled={isLoading} onChange={e => setUserName(e.target.value)}/>
        </label>
        <label>
          <p>Password</p>
          <input type="password" disabled={isLoading} onChange={e => setPassword(e.target.value)}/>
        </label>
        <div>
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Sibmiting...' : 'Submit'}
          </button>
        </div>
        {error && (
          <div>
            {error}
          </div>
        )}
      </form>
    </div>
  );
}

export default Login;
