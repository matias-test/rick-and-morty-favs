import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import User from '../../types/models/User';
import { isSuccessfulResponse } from '../../types/responses/SuccessfulDataResponse';
import userAPI from './userAPI';

interface UserState {
  isAuthenticated: boolean;
  authenticationError: string;
  isAuthenticating: boolean;
}

const initialState: UserState = {
  isAuthenticated: !!window.localStorage.getItem('id_token'),
  authenticationError: '',
  isAuthenticating: false,
}

const authenticate = createAsyncThunk(
  'user/authenticate',
  async (credentials: { username: string, password: string }, thunkAPI): Promise<User> => {
    const response = await userAPI.authenticate(credentials)
    if (isSuccessfulResponse(response)) {
      return response.data;
    } else {
      throw new Error(response.message);
    }
  }
)

const register = createAsyncThunk(
  'user/register',
  async (credentials: { username: string, password: string }, thunkAPI): Promise<User> => {
    const response = await userAPI.register(credentials)
    if (isSuccessfulResponse(response)) {
      return response.data;
    } else {
      throw new Error(response.message);
    }
  }
)

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      window.localStorage.removeItem('id_token');
    }
  },
  extraReducers: (builder) => {
    builder.addCase(authenticate.fulfilled, (state, action) => {
      state.isAuthenticated = true;
      state.isAuthenticating = false;
      state.authenticationError = '';
      window.localStorage.setItem('id_token', action.payload.token);
    })
    builder.addCase(authenticate.rejected, (state, action) => {
      state.isAuthenticated = false;
      state.isAuthenticating = false;
      state.authenticationError = action.error.message || 'Please try again later';
      window.localStorage.removeItem('id_token');
    })
    builder.addCase(authenticate.pending, (state, action) => {
      state.isAuthenticated = false;
      state.isAuthenticating = true;
      state.authenticationError = '';
      window.localStorage.removeItem('id_token');
    })
    // --------------------------
    builder.addCase(register.fulfilled, (state, action) => {
      state.isAuthenticated = true;
      state.isAuthenticating = false;
      state.authenticationError = '';
      window.localStorage.setItem('id_token', action.payload.token);
    })
    builder.addCase(register.rejected, (state, action) => {
      state.isAuthenticated = false;
      state.isAuthenticating = false;
      console.log('action.error', action.error);
      state.authenticationError = action.error.message || 'Please try again later';
      window.localStorage.removeItem('id_token');
    })
    builder.addCase(register.pending, (state, action) => {
      state.isAuthenticated = false;
      state.isAuthenticating = true;
      state.authenticationError = '';
      window.localStorage.removeItem('id_token');
    })
  }
});

// Action creators are generated for each case reducer function
export const { logout } = userSlice.actions;
export { authenticate, register };

export default userSlice.reducer;
