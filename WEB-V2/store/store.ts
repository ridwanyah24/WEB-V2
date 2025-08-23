import { configureStore } from "@reduxjs/toolkit";
import signinReducer from "./signinSlice";
import userReducer from "./userSlice";
import wordReducer from "./wordSlice";

export const store = configureStore({
  reducer: {
    signin: signinReducer,
    user: userReducer,
    word: wordReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
