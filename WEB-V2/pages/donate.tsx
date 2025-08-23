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
                      {/* Bitcoin logo SVG */}
                      <img
                        src="/bitcoin.svg"
                        alt="USDT"
                        className="h-6 w-6"
                      />
                      {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="h-6 w-6">
                        <circle cx="16" cy="16" r="16" fill="#f7931a" />
                        <path
                          fill="#fff"
                          d="M17.5 17.3c.9-.2 1.6-.6 2-1.2s.6-1.4.4-2.2c-.2-.9-.7-1.5-1.4-1.9-.7-.4-1.6-.5-2.7-.3l-.3-1.6-1.2.2.3 1.5c-.3.1-.5.1-.8.2l-.3-1.5-1.2.2.3 1.5c-.2 0-.4.1-.6.1l-1.5.3.3 1.1s.8-.2.8-.2c.5-.1.7.2.8.5l.4 2c.1.4-.1.6-.5.7 0 0-.8.2-.8.2l.2 1.2 1.5-.3c.2 0 .4-.1.6-.1l.3 1.6 1.2-.2-.3-1.5c.3-.1.6-.1.8-.2l.3 1.5 1.2-.2-.3-1.6zm-2.4-4.5c.6-.1 1.2 0 1.6.3.3.2.5.5.6.9.1.4.1.8-.1 1.1s-.6.5-1.2.7l-.9.2-.5-2.5.5-.1zm1.1 5.5c-.7.1-1.1 0-1.4-.3-.3-.2-.5-.6-.6-1l-.2-1.1 1.5-.3c.7-.1 1.3 0 1.6.3.4.2.5.6.6 1 .1.4 0 .8-.3 1.1-.3.3-.7.4-1.2.5z"
                        />
                      </svg> */}
                    </span>
                    {t("Bitcoin Donation")}
                  </h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="mb-4">
                      <p className="text-sm text-gray-500 mb-1">{t("Wallet Address")}</p>
                      <p className="font-mono bg-gray-200 p-2 rounded break-all">
                        bc1qar0srrr7xfkvy516431ydnw9re59gtzzwfgnq0
                      </p>
                    </div>
                    <button
                      onClick={() => setDonated(true)}
                      className="w-full py-3 rounded-lg font-medium bg-orange-800 text-white transition hover:bg-orange-700"
                    >
                      {t("I have Sent Bitcoin")}
                    </button>
                  </div>
                </div>

                {/* Solana */}
                <div className="mt-8">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                    <span className="bg-blue-100 text-blue-800 p-2 rounded-full mr-3">
                      {/* Solana logo SVG */}
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 397 311" className="h-6 w-6">
                        <linearGradient id="sol" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#00FFA3" />
                          <stop offset="100%" stopColor="#DC1FFF" />
                        </linearGradient>
                        <path fill="url(#sol)" d="M64 238a12 12 0 0112-12h307a6 6 0 014 10l-64 63a12 12 0 01-8 3H8a6 6 0 01-4-10l60-54zM64 131a12 12 0 0112-12h307a6 6 0 014 10l-64 63a12 12 0 01-8 3H8a6 6 0 01-4-10l60-54zM64 24A12 12 0 0176 12h307a6 6 0 014 10l-64 63a12 12 0 01-8 3H8a6 6 0 01-4-10l60-54z" />
                      </svg>
                    </span>
                    {t("Solana Donation")}
                  </h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="mb-4">
                      <p className="text-sm text-gray-500 mb-1">{t("Wallet Address")}</p>
                      <p className="font-mono bg-gray-200 p-2 rounded break-all">
                        D5f7gHjK8L9mNqR5tU6vW7xY8zA1bC2dE3fG4hI5jK6lM7nO
                      </p>
                    </div>
                    <button
                      onClick={() => setDonated(true)}
                      className="w-full py-3 rounded-lg font-medium bg-blue-800 text-white transition hover:bg-blue-700"
                    >
                      {t("I have Sent Solana")}
                    </button>
                  </div>
                </div>

                {/* USDT */}
                <div className="mt-8">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                    <span className="bg-green-100 text-green-800 p-2 rounded-full mr-3">
                      {/* USDT logo SVG */}
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2500 2500" className="h-6 w-6">
                        <circle cx="1250" cy="1250" r="1250" fill="#26A17B" />
                        <path fill="#fff" d="M1372 1084v-190h472V560H656v334h471v190c-343 16-602 75-602 146s259 130 602 146v617h244v-617c343-16 602-75 602-146s-259-130-602-146zm0 243v-97c230 11 405 47 405 94s-175 83-405 94zm-244-97v97c-230-11-405-47-405-94s175-83 405-94z" />
                      </svg>
                    </span>
                    {t("USDT Donation")}
                  </h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="mb-4">
                      <p className="text-sm text-gray-500 mb-1">{t("Wallet Address")}</p>
                      <p className="font-mono bg-gray-200 p-2 rounded break-all">
                        T9z7Yx8Wv6Ut5Sr4Qp3Nm2Lo1Ki9Jh8Fg7De6Ct5Br
                      </p>
                    </div>
                    <button
                      onClick={() => setDonated(true)}
                      className="w-full py-3 rounded-lg font-medium bg-green-800 text-white transition hover:bg-green-700"
                    >
                      {t("I have Sent USDT")}
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
