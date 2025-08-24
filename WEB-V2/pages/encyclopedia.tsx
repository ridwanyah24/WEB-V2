import React from "react";
import Header from "./components/layouts/Header";
import Footer from "./components/layouts/Footer";
import Head from "next/head";
import Link from "next/link";
import { FiBookOpen } from "react-icons/fi";
import { FaSearch, FaChevronRight } from "react-icons/fa";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import type { GetStaticProps } from "next";

const Encyclopedia = () => {
  const { t } = useTranslation("common");

  //encyclopedia categories
  const categories = [
    {
      title: "Urhobo Dictionary",
      description: "Comprehensive collection of Urhobo words and meanings",
      count: "1,200+ entries",
      icon: <FiBookOpen className="w-6 h-6" />,
    },
    {
      title: "Cultural Practices",
      description: "Traditional ceremonies, rites and customs",
      count: "85+ practices",
      icon: <FiBookOpen className="w-6 h-6" />,
    },
    {
      title: "Historical Figures",
      description: "Notable Urhobo leaders and influencers",
      count: "60+ profiles",
      icon: <FiBookOpen className="w-6 h-6" />,
    },
    {
      title: "Proverbs & Idioms",
      description: "Wisdom passed through generations",
      count: "300+ sayings",
      icon: <FiBookOpen className="w-6 h-6" />,
    },
    {
      title: "Traditional Music",
      description: "Instruments, rhythms and compositions",
      count: "45+ recordings",
      icon: <FiBookOpen className="w-6 h-6" />,
    },
    {
      title: "Folktales",
      description: "Moral stories and ancestral wisdom",
      count: "120+ stories",
      icon: <FiBookOpen className="w-6 h-6" />,
    },
  ];

  return (
    <div className="w-full min-h-screen ">
      <Head>
        <title>{t("Encyclopedia")}</title>
        <meta
          name="description"
          content="Explore the rich Urhobo language and culture through our comprehensive encyclopedia"
        />
      </Head>
      <Header />

      <main className="mx-auto px-4 py-12 max-w-6xl">
        {/* Hero Section */}
        <section className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-[#053B3A] mb-6">
            {t("Urhobo Encyclopedia")}
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto mb-8">
            {t("Encyclopedia_description")}
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder={t("Search the encyclopedia")}
              aria-label={t("Search the encyclopedia")}
              className="block w-full pl-10 pr-3 py-4 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-[#053B3A] focus:border-[#053B3A]"
            />
          </div>
        </section>

        {/* Categories Grid */}
        <section className="mb-20">
          <h2 className="text-2xl font-semibold text-[#053B3A] mb-8">
            {t("Explore Categories")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <Link
                // href={`/encyclopedia/${category.title.toLowerCase().replace(/\s+/g, "-")}`}
                href={"#"}
                key={index}
                className="group"
              >
                <div className="bg-white rounded-xl shadow-md p-6 h-full border border-gray-100 hover:border-[#053B3A] transition-all duration-200">
                  <div className="flex items-start">
                    <div className="bg-[#053B3A] p-3 rounded-lg text-white mr-4">
                      {category.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[#053B3A] mb-2 group-hover:underline">
                        {t(category.title)}
                      </h3>
                      <p className="text-gray-600 mb-3">
                        {t(category.description)}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">
                          {t(category.count)}
                        </span>
                        <FaChevronRight className="h-5 w-5 text-[#053B3A]" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Featured Content */}
        <section className="mb-20">
          <div className="bg-[#053B3A] rounded-xl shadow-lg p-8 md:p-10 text-white">
            <h2 className="text-3xl font-bold mb-6">Featured Content</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">
                  {t("Word of the day")}
                </h3>
                <div className="bg-white/10 p-6 rounded-lg">
                  <p className="text-2xl font-bold mb-2">Ọghẹnẹ</p>
                  <p className="mb-2">(noun) /ɔ́.ɣɛ́.nɛ́/</p>
                  <p className="italic">
                    {t(
                      "The Supreme Being in Urhobo cosmology",
                    )}
                  </p>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">
                  {t("Cultural Highlight")}
                </h3>
                <div className="bg-white/10 p-6 rounded-lg">
                  <p className="text-2xl font-bold mb-2">Ihegbe Ikeneke</p>
                  <p className="italic">
                    {t("One of many Urhobo National Dances")}
                  </p>
                  <p className="mt-3">
                    {t(
                      "Ikeneke is a traditional Urhobo dance of bold movement, ancestral honor, and deep communal spirit",
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <h2 className="text-2xl font-semibold text-[#053B3A] mb-4">
            {" Contribute to the Encyclopedia"}
          </h2>
          <p className="text-gray-700 mb-8 max-w-2xl mx-auto">
            {
              " Do you have knowledge about Urhobo language or culture to share? Help us expand this resource for future generations."
            }
          </p>
          <Link
            href="/contribute"
            className="inline-flex items-center bg-[#053B3A] text-white px-6 py-3 rounded-full font-semibold text-lg shadow-md hover:bg-[#042a29] transition-colors"
          >
            {t("Share Your Knowledge")}
            <FaChevronRight className="ml-2 h-5 w-5" />
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Encyclopedia;
export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "en", ["common"])),
  },
});
