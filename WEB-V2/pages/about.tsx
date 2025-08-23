import React, { useEffect } from "react";
import Header from "./components/layouts/Header";
import Footer from "./components/layouts/Footer";
import Head from "next/head";
import Link from "next/link";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import type { GetStaticProps } from "next";
import { useTranslation } from "next-i18next";

const About = () => {
  const { t, i18n } = useTranslation("common");

  useEffect(() => {
    if (i18n.language !== "urhobo") {
      i18n.changeLanguage("urhobo");
    }
  }, [i18n]);

  return (
    <div className="w-full min-h-screen ">
      <Head>
        <title>{t("About")} </title>
        <meta
          name="description"
          content={t(
            "About Guọnọ, a community dedicated to the Urhobo language.",
          )}
        />
      </Head>
      <Header />
      <main className="mx-auto px-4 py-16 max-w-4xl  ">
        <section className="mb-16">
          <div className="bg-white rounded-xl shadow-lg p-8 md:p-10">
            <h2 className="text-3xl font-bold text-[#053B3A] mb-6">
              {t("Our Mission")}
            </h2>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              {t("mission_description")}
            </p>

            <div className="flex justify-center my-10">
              <div className="w-32 h-1 bg-[#053B3A] rounded-full"></div>
            </div>

            <h3 className="text-2xl font-semibold text-[#053B3A] mb-4">
              {t("The Urhobo Language")}
            </h3>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              {t("language_description")}
            </p>
          </div>
        </section>

        <section className="mb-16">
          <div className="bg-[#053B3A] rounded-xl shadow-lg p-8 md:p-10 text-white">
            <h2 className="text-3xl font-bold mb-6">{t("Our Vision")}</h2>
            <p className="text-lg mb-6 leading-relaxed">
              {t("vision_description")}
            </p>
            <p className="text-lg leading-relaxed">
              {t("vision-description_1")}
            </p>
          </div>
        </section>

        <section>
          <div className="bg-white rounded-xl shadow-lg p-8 md:p-10 text-center">
            <h2 className="text-3xl font-bold text-[#053B3A] mb-6">
              {t("Our Future")}
            </h2>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              {t("future_description")}
            </p>
            <div className="flex justify-center">
              <Link
                href="https://chat.whatsapp.com/BvdjCflnxPDBO7TrGoNjZS?mode=ac_t"
                className=" bg-[#053B3A] text-white px-6 py-3 rounded-full font-semibold text-lg shadow-md"
              >
                {t("Join Our Movement")}
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "urhobo", ["common"])),
  },
});
