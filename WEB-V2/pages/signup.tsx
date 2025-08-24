"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import PhoneLayout from "./components/layouts/PhoneLayout";
import { signUp } from "@/utils/api-service";
import { useRouter } from "next/router";
import { RiLoader2Fill } from "react-icons/ri";
import { toast } from "react-hot-toast";
import { setItem } from "@/utils/page-manager";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import type { GetStaticProps } from "next";
import { useTranslation } from "next-i18next";

export default function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submissionStarted, setSubmissionStarted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();
  const { t, i18n } = useTranslation("common");

  // Default language set to Urhobo
  useEffect(() => {
    if (i18n.language !== "urh") {
      i18n.changeLanguage("urh");
    }
  }, [i18n]);

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "urh" : "en";
    i18n.changeLanguage(newLang);
  };

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmissionStarted(true);
    setItem("email", email);

    const result = await signUp(firstName, lastName, username, email, password);

    if (result.success) {
      toast.success(result.message);
      router.push("/verify-otp");
    } else {
      toast.error(result.error);
    }
    setSubmissionStarted(false);
  };

  return (
    <main className="min-h-screen text-[#fff] bg-[#E9F9F9] grid grid-cols-1 lg:grid-cols-2">
      {/* Phone Preview */}
      <PhoneLayout />

      {/* Signup Form */}
      <section className="flex justify-center items-center mx-auto">
        <div
          className="relative bg-[#05353A] rounded-3xl w-[330px] md:w-[500px] h-auto"
          aria-label={t("signupFormAriaLabel")}
        >
          {/* Toggle button */}
          <button
            onClick={toggleLanguage}
            className="absolute top-4 right-4 px-3 py-1 rounded-lg bg-[#F9E1BE] text-[#073B3A] text-sm font-medium"
          >
            {i18n.language === "en" ? "Urhobo" : "English"}
          </button>

          <form onSubmit={handleSignUp} className="px-4 md:px-8 py-12">
            <h2 className="text-2xl font-semibold mb-2">{t("Welcome")}</h2>
            <p className="mb-6 text-[20px] font-medium text-[#BEBEBE]">
              {t("secureAccountCreation")}
            </p>
            <div className="flex items-center gap-2 mb-2 w-full">
              <div className="flex flex-col items-start">
                <label className="block mb-3 text-base" htmlFor="firstname">
                  {t("First Name")}
                </label>
                <input
                  type="text"
                  id="firstname"
                  placeholder={t("enterFirstName")}
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-4 py-3 mb-5 rounded-md border border-[#fff] text-sm focus:outline-none"
                  aria-required="true"
                />
              </div>
              <div className="flex flex-col items-start">
                <label className="block mb-3 text-base" htmlFor="lastname">
                  {t("Last Name")}
                </label>
                <input
                  type="text"
                  id="lastname"
                  placeholder={t("enterLastName")}
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full px-4 py-3 mb-5 rounded-md border border-[#fff] text-sm focus:outline-none"
                  aria-required="true"
                />
              </div>
            </div>

            <label className="block mb-3 text-base" htmlFor="username">
              {t("Username")}
            </label>
            <input
              type="text"
              id="username"
              placeholder={t("enterUsername")}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 mb-5 rounded-md border border-[#fff] text-sm focus:outline-none"
              aria-required="true"
            />

            <label className="block mb-3 text-base" htmlFor="email">
              {t("emailAddress")}
            </label>
            <input
              type="email"
              id="email"
              placeholder={t("enterEmailAddress")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 mb-5 rounded-md border border-[#fff] text-sm focus:outline-none"
              aria-required="true"
            />

            <label className="block mb-3 text-base" htmlFor="password">
              {t("passWord")}
            </label>
            <div>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder={t("Enter New Password")}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 mb-2 relative rounded-md border border-[#f2f3f4] "
                aria-required="true"
              />
              <button
                type="button"
                className="absolute -translate-x-8 translate-y-1/2 transform border-none text-[#F5DEB3]"
                onClick={() => setShowPassword(!showPassword)}
                onFocus={(e) => e.target.blur()}
                aria-label={
                  showPassword ? t("hidePassword") : t("showPassword")
                }
              >
                {showPassword ? (
                  <IoMdEyeOff size="24" />
                ) : (
                  <IoMdEye size="24" />
                )}
              </button>
            </div>

            <div className="flex justify-center items-center mt-6 gap-4">
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-3 py-3 rounded-md bg-[#F9E1BE] text-[#073B3A] text-base font-bold"
              >
                <span>{t("Continue")}</span>
                {submissionStarted && (
                  <span>
                    <RiLoader2Fill className="animate-spin" />
                  </span>
                )}
              </button>
            </div>

            <p className="text-center text-base font-normal mt-6 text-white">
              {t("Have an Account? SignIn")}{" "}
              <Link href="/signin" className="text-[#F5DEB3]">
                {t("Login")}
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