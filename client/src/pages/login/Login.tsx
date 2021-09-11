import React, { FormEvent, useState } from 'react';
import { useApiClient } from '../../context/ApiClientProvider';
import { AuthAction, useUserDispatch } from '../../context/UserContext';
import { isFailureResponse } from '../../types/responses/FailureResponse';

function Login () {
  const apiClient = useApiClient();
  const dispatch = useUserDispatch();
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmition = async (event: FormEvent) => {
    setIsLoading(true);
    setError('');

    event.preventDefault();

    // Move to Redux
    const response = await apiClient.login({ username, password });

    if (isFailureResponse(response)) {
      setError(response.message || 'Please try again later');
    } else {
      const user = response.data; // store user
      window.localStorage.setItem('id_token', user.token);
      dispatch({ type: AuthAction.loginSuccess });
    }
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
