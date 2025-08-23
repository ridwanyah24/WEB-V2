
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import PhoneLayout from "./components/layouts/PhoneLayout";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "@/types/hooks";
import { updateField } from "@/store/signinSlice";
import { signIn } from "@/utils/api-service";
import { RiLoader2Fill } from "react-icons/ri";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import type { GetStaticProps } from "next";
import { useTranslation } from "react-i18next";

export default function SignIn() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { email, password, submissionStarted, error } = useAppSelector(
    (state) => state.signin,
  );
  const [showPassword, setShowPassword] = useState(false);
  const { t, i18n } = useTranslation("common");

  // Default language set to Urhobo
  useEffect(() => {
    if (i18n.language !== "ur") {
      i18n.changeLanguage("ur");
    }
  }, [i18n]);

  const handleChange = (field: string, value: string) => {
    dispatch(updateField({ [field]: value }));
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(updateField({ submissionStarted: true, error: null }));
    const response = await signIn(email, password, dispatch);

    if (response.success) {
      toast.success("Login successful");
      router.push("/home");
    } else {
      toast.error(response.error);
    }
  };

  // toggle between English and Urhobo
  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "ur" : "en";
    i18n.changeLanguage(newLang);
  };

  return (
    <main className="min-h-screen text-[#fff] bg-[#E9F9F9] grid grid-cols-1 lg:grid-cols-2">
      <PhoneLayout />
      <section className="flex justify-center items-center mx-auto">
        <div
          className="bg-[#05353A] rounded-3xl w-[330px] md:w-[500px] h-[620px] relative"
          aria-label="Login form"
        >
          {/* 🔘 Language toggle button */}
          <button
            onClick={toggleLanguage}
            className="absolute top-4 right-4 px-3 py-1 cursor-pointer rounded-md bg-[#F9E1BE] text-[#073B3A] font-semibold text-sm"
          >
            {i18n.language === "ur" ? "English" : "Urhobo"}
          </button>

          <form onSubmit={handleLogin} className="px-4 md:px-8 py-12">
            <h2 className="text-2xl font-semibold mb-2">{t("welcomeBack")}</h2>
            <p className="mb-6 text-[20px] font-medium text-[#BEBEBE]">
              {t("Securely login to your account")}
            </p>

            {error && <p className="text-red-500 mb-4">{error}</p>}

            <label className="block mb-3 text-base" htmlFor="email">
              {t("emailAddress")}
            </label>
            <input
              type="email"
              id="email"
              placeholder={t("ọghẹnẹtega@guono.com")}
              value={email}
              onChange={(e) => handleChange("email", e.target.value)}
              className="w-full px-4 py-3 mb-5 rounded-md border border-[#fff] text-sm"
              aria-required="true"
            />

            <label className="block mb-3 text-base" htmlFor="password">
              {t("passWord")}
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder={t("******")}
                value={password}
                onChange={(e) => handleChange("password", e.target.value)}
                className="w-full px-4 py-3 mb-2 rounded-md border border-[#f2f3f4]"
                aria-required="true"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#F5DEB3]"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={
                  showPassword ? t("Hide password") : t("Show password")
                }
              >
                {showPassword ? (
                  <IoMdEyeOff size={24} />
                ) : (
                  <IoMdEye size={24} />
                )}
              </button>
            </div>

            <div className="text-right text-base mb-10">
              <Link href="/forgot-password" className="text-[#F5DEB3]">
                {t("forgotPassword?")}
              </Link>
            </div>

            <div className="flex justify-center items-center gap-4">
              <button
                type="submit"
                disabled={submissionStarted}
                className="w-full py-3 rounded-md bg-[#F9E1BE] text-[#073B3A] text-base cursor-pointer font-bold flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submissionStarted && (
                  <span>
                    <RiLoader2Fill className="animate-spin" />
                  </span>
                )}
                <span>{t("Login")}</span>
              </button>
            </div>

            <p className="text-center text-base font-normal mt-6 text-white">
              {t("Don’t have an account?")}{" "}
              <Link href="/signup" className="text-[#F5DEB3]">
                {t("signUp")}
              </Link>
            </p>
          </form>
        </div>
      </section>
    </main>
  );
}


export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "en", ["common"])),
  },
});
