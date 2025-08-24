import React, { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAppSelector, useAppDispatch } from "@/types/hooks";
import Loader from "@/pages/components/Loader";
import { setAuthData } from "@/store/signinSlice";
import { setUser } from "@/store/userSlice";

interface AuthGuardProps {
  children: ReactNode;
  requiresAuth?: boolean;
}

const AuthGuard: React.FC<AuthGuardProps> = ({
  children,
  requiresAuth = false,
}) => {
  const [bootstrapping, setBootstrapping] = useState(true);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.signin);
  const { user } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (typeof window === "undefined") {
      setBootstrapping(false);
      return;
    }

    const token = sessionStorage.getItem("accessToken");
    const refreshToken = sessionStorage.getItem("refreshToken");
    const userJsonData = sessionStorage.getItem("user");

    if (token && refreshToken && userJsonData) {
      try {
        const user = JSON.parse(userJsonData);
        dispatch(setAuthData({ token, refreshToken }));
        dispatch(setUser(user));
      } catch {
        sessionStorage.removeItem("accessToken");
        sessionStorage.removeItem("refreshToken");
        sessionStorage.removeItem("user");
      }
    }

    setBootstrapping(false);
  }, [dispatch]);

  useEffect(() => {
    if (bootstrapping) return;

    // redirect authenticated user to /home
    if (isAuthenticated && user && router.pathname === "/") {
      router.replace("/home");
      return;
    }

    // Redirect authenticated users away from auth pages
    if (
      isAuthenticated &&
      user &&
      (router.pathname === "/signin" ||
        router.pathname === "/signup" ||
        router.pathname === "/verify-otp")
    ) {
      router.replace("/home");
      return;
    }

    // If page requires auth but user is not authenticated, redirect to signin
    if (requiresAuth && !isAuthenticated) {
      router.replace("/");
    }
  }, [requiresAuth, bootstrapping, isAuthenticated, user, router]);

  if (bootstrapping) return <Loader />;
  if (requiresAuth && !isAuthenticated) return null;
  if (requiresAuth && isAuthenticated && !user) return <Loader />;

  // Show loading when redirecting authenticated users from landing page or auth pages
  if (
    isAuthenticated &&
    user &&
    (router.pathname === "/" ||
      router.pathname === "/signin" ||
      router.pathname === "/signup" ||
      router.pathname === "/verify-otp")
  )
    return <Loader />;

  return <>{children}</>;
};

export default AuthGuard;
