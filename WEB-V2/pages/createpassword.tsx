// pages/signin.tsx

"use client";

import React from "react";
import PhoneLayout from "./components/layouts/PhoneLayout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import type { GetStaticProps } from "next";
import { useTranslation } from "next-i18next";

export default function CreatePassword() {
  const { t } = useTranslation("common");

  return (
    <main className="min-h-screen text-[#fff] bg-[#E9F9F9] grid grid-cols-1 lg:grid-cols-2">
      {/* Phone Preview */}
      <PhoneLayout />

      {/* Create new Password Form */}
      <section className="flex justify-center items-center   mx-auto">
        <div
          className="bg-[#073B3A] rounded-3xl  w-[330px] md:w-[500px] h-[322px]"
          aria-label="create password form"
        >
          <form className="px-4 md:px-8 py-12">
            <h2 className="text-2xl font-semibold mb-2">
              {t("Create Password")}
            </h2>
            <p className="mb-6 text-xl font-medium text-[#BEBEBE]">
              {t("Create a new password")}
            </p>

            <label className="sr-only" htmlFor="newPassword">
              {t("New Password")}
            </label>
            <input
              type="password"
              id="newPassword"
              placeholder={t("Enter your new password")}
              className="w-full px-4 py-3 mb-5 rounded-md border border-gray-300 text-sm focus:outline-none"
              aria-required="true"
            />

            <div className="flex justify-center items-center md:mt-5  gap-4">
              <button
                type="submit"
                className="w-full py-3 rounded-md bg-[#F9E1BE] text-[#073B3A] text-base font-bold"
              >
                {t("Continue")}
              </button>
            </div>
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
