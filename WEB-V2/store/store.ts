import { configureStore } from "@reduxjs/toolkit";
import signinReducer from "./signinSlice";
import userReducer from "./userSlice";
import wordReducer from "./wordSlice";
import changeLang from "./changeLangSlice";

export const store = configureStore({
  reducer: {
    signin: signinReducer,
    user: userReducer,
    word: wordReducer,
    language: changeLang,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
