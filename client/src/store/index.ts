import thunk, { ThunkDispatch } from 'redux-thunk'
import { configureStore, AnyAction } from '@reduxjs/toolkit'
import userReducer from '../features/user/userSlice'


const store = configureStore({
  reducer: {
    user: userReducer,
  },
  middleware: [thunk],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ThunkDispatch<RootState, void, AnyAction>;

export default store;
