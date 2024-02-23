import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import openFullPostReducer from './slices/openFullPost';
import userReducer from './slices/user.slice';

export const store = configureStore({
  reducer: {
    openFullPost: openFullPostReducer,
    user: userReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
