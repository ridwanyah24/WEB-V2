// pages/signin.tsx

"use client";

import React from "react";
import Link from "next/link";
import PhoneLayout from "./components/layouts/PhoneLayout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import type { GetStaticProps } from "next";
import { useTranslation } from "next-i18next";

export default function RecoverPassword() {
  const { t } = useTranslation("common");
  return (
    <main className="min-h-screen text-[#fff] bg-[#E9F9F9] grid grid-cols-1 lg:grid-cols-2 ">
      {/* Phone Preview */}
      <PhoneLayout />

      {/* Forgot Password Form */}
      <section className="flex justify-center items-center    mx-auto">
        <div
          className="bg-[#073B3A] rounded-3xl  w-[330px] md:w-[500px] h-[412px]"
          aria-label="recover password form"
        >
          <form className="px-4 md:px-8 py-12">
            <h2 className="text-2xl font-semibold mb-2">
              {t("Recover Account")}
            </h2>
            <p className="mb-6 text-xl font-medium text-[#BEBEBE]">
              {t("Enter the code we’ve have sent to your email")}
            </p>

            <label htmlFor="code" className="sr-only">
              {t("Verification Code")}
            </label>
            <input
              type="text"
              placeholder={t("Enter the code")}
              className="w-full px-4 py-3 mb-5 rounded-md border border-gray-300 text-sm focus:outline-none"
              aria-required="true"
            />

            <div className="text-left text-base mb-10 text-[#BEBEBE]">
              <h3>
                {t("Didn’t get a code?")}{" "}
                <Link href="/" className="text-[#F5DEB3]">
                  {t("Resend")}{" "}
                </Link>
              </h3>
            </div>
            <div className="flex justify-center items-center  gap-4">
              <button
                type="submit"
                className="w-full py-3 rounded-md bg-[#F9E1BE] text-[#073B3A] text-base font-bold"
              >
                {t("Continue")}
              </button>
            </div>

            <p className="text-center text-base font-normal mt-6 text-white">
              {t("Back to")}{" "}
              <Link href="/signin" className="text-[#F9E1BE] ">
                {t("sign in")}
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
