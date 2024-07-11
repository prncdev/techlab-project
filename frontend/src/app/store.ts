import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from '../auth/authSlice';

const store = configureStore({
  reducer: {
    auth: authSliceReducer,
  },
});

export type AuthState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;