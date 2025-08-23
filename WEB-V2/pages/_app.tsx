import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store, RootState } from "../store/store";
import AuthGuard from "@/pages/components/guards/AuthGuard";
import { useEffect } from "react";
import { getUserProfile } from "@/utils/api-service";
import { appWithTranslation } from "next-i18next";
import nextI18nConfig from "../next-i18next.config";

function UserBootstrapper() {
  const dispatch = useDispatch();
  const { token } = useSelector((state: RootState) => state.signin);
  const { user } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (token && !user) {
      getUserProfile(token, dispatch);
    }
  }, [token, user, dispatch]);

  return null;
}

interface CustomAppProps extends AppProps {
  Component: AppProps["Component"] & {
    requiresAuth?: boolean;
  };
}

function App({ Component, pageProps }: CustomAppProps) {
  const requiresAuth = Component.requiresAuth ?? false;

  return (
    <Provider store={store}>
      <UserBootstrapper />
      <AuthGuard requiresAuth={requiresAuth}>
        <div className="bg-[#f2feff] ">
          <Toaster />
          <Component {...pageProps} />
        </div>
      </AuthGuard>
    </Provider>
  );
}
export default appWithTranslation(App, nextI18nConfig);
