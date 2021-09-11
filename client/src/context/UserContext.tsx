import React, { ReactNode, useContext, useReducer } from 'react';

interface AuthState {
  isAuthenticated: boolean;
}

enum AuthAction {
  loginSuccess = 'LOGIN_SUCCESS',
  signOutSuccess = 'SIGN_OUT_SUCCESS',
}

type AuthDispatch = React.Dispatch<{ type: AuthAction; }>;

const UserStateContext = React.createContext<AuthState>({ isAuthenticated: true });
const UserDispatchContext = React.createContext<AuthDispatch>(() => {});

function userReducer (state: AuthState, action: { type: AuthAction }) {
  switch (action.type) {
    case AuthAction.loginSuccess:
      return { ...state, isAuthenticated: true };
    case AuthAction.signOutSuccess:
      return { ...state, isAuthenticated: false };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function UserProvider ({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(userReducer, {
    isAuthenticated: true, // !!window.localStorage.getItem('id_token')
  });

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
}

function useUserState () {
  const context = useContext(UserStateContext);
  if (context === undefined) {
    throw new Error('useUserState must be used within a UserProvider');
  }
  return context;
}

function useUserDispatch () {
  const context = useContext(UserDispatchContext);
  if (context === undefined) {
    throw new Error('useUserDispatch must be used within a UserProvider');
  }
  return context;
}

function loginUser () {
  // TODO
}

function signOut () {
  // TODO
}

export { UserProvider, useUserState, useUserDispatch, loginUser, signOut };
