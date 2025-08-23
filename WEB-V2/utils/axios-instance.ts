import axios from "axios";
import { store } from "@/store/store";
import { logout } from "@/store/signinSlice";
import { clearUser } from "@/store/userSlice";

const api = axios.create({
  baseURL: "https://backend-v2-production-4128.up.railway.app",
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    if (status === 401) {
      try { store.dispatch(logout()); } catch {}
      try { store.dispatch(clearUser()); } catch {}
      if (typeof window !== "undefined") {
        sessionStorage.removeItem("accessToken");
        sessionStorage.removeItem("refreshToken");
        sessionStorage.removeItem("user");
      }
    }
    return Promise.reject(error);
  }
);

export default api;
