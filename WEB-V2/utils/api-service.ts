import api from "./axios-instance"
import { setAuthData, updateField, logout } from "@/store/signinSlice";
import { setUser, clearUser } from "@/store/userSlice";
import { setWordOfDay, setLoading, setError, setDetailedWord } from "@/store/wordSlice";

// sign in
export const signIn = async (
  email: string,
  password: string,
  dispatch: any,
) => {
  try {
    const res = await api.post("/auth/login", { email, password });
    dispatch(
      setAuthData({
        token: res.data.accessToken,
        refreshToken: res.data.refreshToken,
      }),
    );

    dispatch(setUser(res.data.user));
    if (typeof window !== "undefined") {
      sessionStorage.setItem("user", JSON.stringify(res.data.user));
    }

    dispatch(updateField({ submissionStarted: false }));
    return { success: true, user: res.data.user };
  } catch (error: any) {
    dispatch(
      updateField({
        submissionStarted: false,
        error: error.response?.data?.message || "Login failed",
      }),
    );
    return {
      success: false,
      error: error.response?.data?.message || "Login failed",
    };
  }
};

// sign up
export const signUp = async (firstName: string, lastName: string, username: string, email: string, password: string) => {
  try {
    const res = await api.post("/auth/register", { firstName, lastName, username, email, password });
    return {
      success: true,
      message: res.data.message || "Verification email sent",
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.message || "Registration failed",
    };
  }
};

// verify OTP
export const verifyOTP = async (otp: string, email: string) => {
  try {
    const res = await api.post("/auth/verify-otp", { otp, email });
    return { success: true, message: res.data.message };
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.message || "OTP verification failed",
    };
  }
};

// resend OTP
export const resendOTP = async (email: string) => {
  try {
    const res = await api.post("/auth/resend-otp", { email });
    return { success: true, message: res.data.message };
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.message || "Failed to resend OTP",
    };
  }
};


// update profile image
export const updateProfileImage = async (
  imageData: string,
  token: string,
  dispatch: any
) => {
  try {
    const res = await api.post(
      "/users/me/profile-picture",
      { imageData }, // backend expects { imageData: "base64string" }
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    // update redux store
    // dispatch(setUser(res.data));

    // persist in session
    // if (typeof window !== "undefined") {
    //   sessionStorage.setItem("user", JSON.stringify(res.data));
    // }

    return { success: true, user: res.data };
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.message || "Profile update failed",
    };
  }
};

// update user's first and last name
export const updateName = async (firstName: string, lastName: string, token: string, dispatch: any) => {
  try {
    const res = await api.put(
      "/users/me/name",
      { firstName, lastName },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    );
    dispatch(setUser(res.data));
    if (typeof window !== "undefined") {
      sessionStorage.setItem("user", JSON.stringify(res.data));
    }
    return { success: true, user: res.data };
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.message || "Update failed",
    };
  }
};

// update user's username
export const updateUserName = async (username: string, token: string, dispatch: any) => {
  try {
    const res = await api.put(
      "/users/me/username",
      { username },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    );
    dispatch(setUser(res.data));
    if (typeof window !== "undefined") {
      sessionStorage.setItem("user", JSON.stringify(res.data));
    }
    return { success: true, user: res.data };
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.message || "Update failed",
    };
  }
};

// logout
export const logOut = async (dispatch: any, token: any) => {
  try {
    // const res = await api.post("/auth/logout", {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   }
    // })
    dispatch(clearUser());
    dispatch(logout());

    return { success: true, message: "Logged out successfully" };
  } catch (error: any) {
    return { success: false, error: error.response?.data?.message };
  }
};


// word of day
export const wordOfDay = async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    dispatch(setError(null));

    const res = await api.get("/word-of-day");
    console.log("response", res.data);

    dispatch(
      setWordOfDay({
        word: res.data.word_of_day.word,
        meaning: res.data.word_of_day.meaning,
        photo: {
          url: res.data.word_of_day.photo.url || "/images/dish.svg",
          type: res.data.word_of_day.photo.type || "photo",
        },
      }),
    );

    return { success: true, word: res.data };
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || "Failed to fetch word of day";
    dispatch(setError(errorMessage));

    // Set fallback word on error
    dispatch(
      setWordOfDay({
        word: "Dish",
        meaning:
          "A dish refers to a prepared or cooked item of food that is served as part of a meal.",
        photo: {
          url:  "/images/dish.svg",
          type: "photo",
        },
      }),
    );

    return { success: false, error: errorMessage };
  } finally {
    dispatch(setLoading(false));
  }
};

// get user profile
export const getUserProfile = async (token: string, dispatch: any) => {
  try {
    const res = await api.get("/users/me/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    dispatch(setUser(res.data));
    if (typeof window !== "undefined") {
      sessionStorage.setItem("user", JSON.stringify(res.data));
    }

    return { success: true, profile: res.data };
  } catch (error: any) {
    return { success: false, error: error.response?.data?.message };
  }
};

// verify user
export const verifyUser = async (email: string) => {
  try {
    const res = await api.post("/auth/verify-user", { email });
    console.log('verify user response', res.data);
    return { success: true, data: res.data };
  } catch (error: any) {
    return { success: false, error: error.response?.data?.message };
  }
};

// request password reset
export const requestPasswordReset = async (email: string, id: string) => {
  try {
    const res = await api.post("/auth/enhanced-reset", { userId: id, email });
    return { success: true, message: res.data.message };
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.message || "Failed to send reset email",
    };
  }
};

// verify reset OTP
export const verifyResetOTP = async (email: string, otp: string) => {
  try {
    const res = await api.post("/auth/verify-reset-otp", { email, otp });
    return {
      success: true,
      message: res.data.message,
      resetToken: res.data.resetToken,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.message || "OTP verification failed",
    };
  }
};

// reset password
export const resetPassword = async (email: string, refreshToken: string | null, password: string, confirmPassword: string) => {
  try {
    const res = await api.post("/auth/reset-password", {
      email,
      resetToken: refreshToken,
      password,
      confirmPassword,
    });
    return { success: true, message: res.data.message };
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.message || "Password reset failed",
    };
  }
};

// get autocomplete suggestions
export const getAutocompleteSuggestions = async (prefix: string, token: any) => {
  try {
    const response = await api.get(
      `/search/autocomplete?prefix=${encodeURIComponent(prefix)}&limit=10&language=all`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    );

    console.log("autocomplete response", response.data);
    return response.data.suggestions;
  } catch (error) {
    console.error("Autocomplete error:", error);
  }
};

// fetch detailed word
export const getWordDetails = async (term: string, token: string, dispatch: any) => {
  try {
    dispatch(setLoading(true));
    dispatch(setError(null));

    const res = await api.get("/search", {
      params: {
        searchTerm: term,
        language: "all",
      },
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const detailed = res.data;
    console.log("detailed", res.data);
    dispatch(setDetailedWord(detailed || null));
    return { success: true, word: detailed };
  } catch (error: any) {
    const msg = error.response?.data?.message || "Failed to fetch details";
    dispatch(setError(msg));
    dispatch(setDetailedWord(null));
    return { success: false, error: msg };
  } finally {
    dispatch(setLoading(false));
  }
};
