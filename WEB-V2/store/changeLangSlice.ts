import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Language = "en" | "urhobo";

interface LanguageState {
  language: Language;
}

const initialState: LanguageState = {
  language: "en", // default language
};

const changeLanguageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<Language>) => {
      state.language = action.payload;
    },
    toggleLanguage: (state) => {
      state.language = state.language === "en" ? "urhobo" : "en";
    },
  },
});

export const { setLanguage, toggleLanguage } = changeLanguageSlice.actions;
export default changeLanguageSlice.reducer;