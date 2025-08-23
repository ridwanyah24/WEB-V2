//Donate Page

import { useState } from "react";
import Head from "next/head";
import Header from "./components/layouts/Header";
import Footer from "./components/layouts/Footer";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import type { GetStaticProps } from "next";
import { useTranslation } from "next-i18next";

const donationList = [
  {
    heading: "Documenting Urhobo vocabulary and grammar",
  },
  {
    heading: "Creating educational materials for schools",
  },
  {
    heading: "Developing language learning apps",
  },
  {
    heading: "Organizing cultural events and workshops",
  },
];

const DonatePage = () => {
  const [donated, setDonated] = useState(false);
  const { t, i18n } = useTranslation("common");

  return (
    <div className="min-h-screen ">
      <Header />
      <Head>
        <title>  {t("Donate")}</title>
        <meta
          name="description"
          content={t(
            "Donate to preserve and promote Urhobo language and culture",
          )}
        />
      </Head>

      {/* Hero Section */}
      <section className="bg-[#05353A] text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {t("Support Urhobo Language and Culture")}
          </h2>
          <p className="text-xl md:text-2xl leading-relaxed">
            {t(
              "The Urhobo language and culture are a rich heritage that deserves to be preserved and promoted for future generations.",
            )}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Donation Info */}
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-[#05353A] mb-4">
                {t("Our Mission")}
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                {t(
                  "Our work is dedicated to ensuring that this language, which carries the essence of our identity, continues to thrive in the modern world.",
                )}
              </p>
              <p className="text-lg text-gray-700">
                {t(
                  "We rely on the generosity of people who understand the importance of preserving and promoting Urhobo language and culture.",
                )}
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 ">
              <h3 className="text-2xl font-semibold text-[#05353A] mb-4">
                {t("How Your Donation Helps")}
              </h3>
              <ul className="space-y-3 text-lg text-gray-800">
                {donationList.map((item, index) => {
                  return (
                    <li className="flex items-start" key={index}>
                      <span className="text-[#05353A] mr-2">✓</span>
                      <span>{t(item.heading)}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          {/* Donation Options */}
          <div className="bg-white rounded-xl shadow-lg p-8 sticky top-8">
            <h2 className="text-3xl font-bold text-[#05353A] mb-6 text-center">
              {t("Donate Now")}
            </h2>

            {donated ? (
              <div className="text-center py-8">
                <div className="text-green-600 text-5xl mb-4">✓</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  {t("Thank You!")}
                </h3>
                <p className="text-lg text-gray-600 mb-6">
                  {t(
                    "Your generous donation will help preserve Urhobo language and culture.",
                  )}
                </p>
                <button
                  onClick={() => setDonated(false)}
                  className="bg-[#05353A] text-white px-6 py-3 rounded-lg font-medium hover:bg-amber-700 transition"
                >
                  {t("Make Another Donation")}
                </button>
              </div>
            ) : (
              <>
                <p className="text-lg text-gray-700 mb-8 text-center">
                  {t(
                    "Choose your preferred method below to make a secure donation.",
                  )}
                </p>

                {/* Bitcoin */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                    <span className="bg-orange-100 text-orange-800 p-2 rounded-full mr-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </span>
                    {t("Bitcoin Donation")}
                  </h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="mb-4">
                      <p className="text-sm text-gray-500 mb-1">
                        {t("Wallet Address")}
                      </p>
                      <p className="font-mono bg-gray-200 p-2 rounded break-all">
                        bc1qar0srrr7xfkvy516431ydnw9re59gtzzwfgnq0
                      </p>
                    </div>
                    <button
                      onClick={() => setDonated(true)}
                      className="w-full  py-3 rounded-lg font-medium bg-orange-800 text-white transition"
                    >
                      {t("I have Sent Bitcoin")}
                    </button>
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                    <span className="bg-blue-100 text-blue-800 p-2 rounded-full mr-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </span>
                    {t("Solana Donation")}
                  </h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="mb-4">
                      <p className="text-sm text-gray-500 mb-1">
                        {t("Wallet Address")}
                      </p>
                      <p className="font-mono bg-gray-200 p-2 rounded break-all">
                        D5f7gHjK8L9mNqR5tU6vW7xY8zA1bC2dE3fG4hI5jK6lM7nO
                      </p>
                    </div>
                    <button
                      onClick={() => setDonated(true)}
                      className="w-full py-3 rounded-lg font-medium bg-blue-800 text-white transition"
                    >
                      {t("I have Sent Solana")}
                    </button>
                  </div>
                </div>

                <div className="mt-8 p-4  rounded-lg ">
                  <p className="text-sm text-gray-600 text-center">
                    {t(
                      "All donations go directly to our official accounts. We do not ask for personal information.",
                    )}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </main>

      {/* Testimonials */}
      {/* <section className=" py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-[#05353A] mb-8">
            Why People Support Us
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <p className="text-gray-700 italic mb-4">
                &#39;As an Urhobo living abroad, supporting this initiative
                helps me stay connected to my roots.&#39;
              </p>
              <p className="font-medium text-[#05353A]">- Omonigho E.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <p className="text-gray-700 italic mb-4">
                &#39;Preserving indigenous languages is crucial for cultural
                diversity. I&#39;m proud to contribute.&#39;
              </p>
              <p className="font-medium  text-[#05353A]">- Prof. Johnson M.</p>
            </div>
          </div>
        </div>
      </section> */}
      <Footer />
    </div>
  );
};

export default DonatePage;

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "en", ["common"])),
  },
});
