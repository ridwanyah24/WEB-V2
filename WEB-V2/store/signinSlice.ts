import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SignInState {
  email: string;
  password: string;
  submissionStarted: boolean;
  error: string | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
}

const initialState: SignInState = {
  email: "",
  password: "",
  submissionStarted: false,
  error: null,
  token: null,
  refreshToken: null,
  isAuthenticated: false,
};

const signinSlice = createSlice({
  name: "signin",
  initialState,
  reducers: {
    updateField: (state, action: PayloadAction<Partial<SignInState>>) => {
      Object.assign(state, action.payload);
    },
    setAuthData: (
      state,
      action: PayloadAction<{ token: string; refreshToken: string }>,
    ) => {
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
      state.isAuthenticated = true;
      state.error = null;
      if (typeof window !== "undefined") {
        sessionStorage.setItem("accessToken", action.payload.token);
        sessionStorage.setItem("refreshToken", action.payload.refreshToken);
      }
    },
    logout: (state) => {
      state.token = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.email = "";
      state.password = "";
      state.error = null;
      if (typeof window !== "undefined") {
        sessionStorage.removeItem("accessToken");
        sessionStorage.removeItem("refreshToken");
        sessionStorage.removeItem("user");
      }
    },
    resetSignInState: () => initialState,
  },
});

export const { updateField, setAuthData, logout, resetSignInState } =
  signinSlice.actions;
  
export default signinSlice.reducer;
