import React from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import type { GetStaticProps } from "next";
import { useTranslation } from "next-i18next";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { IoArrowBack } from "react-icons/io5"; // Back arrow icon


const PrivacyPolicy = () => {
  const { t, i18n } = useTranslation("common");
  const router = useRouter();
  useEffect(() => {
    if (i18n.language !== "en") {
      i18n.changeLanguage("en");
    }
  }, [i18n]);

  const sections = [
    {
      title: "Effective Upon Use",
      content:
        "Guọnọ Dictionary (Guọnọ & App) is committed to protecting your personal information and ensuring transparency in our data practices. We have adopted a Plain Language Privacy Policy approach—meaning our policy is written in concise, accessible language to help you clearly understand how your information is collected, used, and protected.",
      additional:
        "This Privacy Policy explains what data we collect, how we use it, and your rights regarding that data. It is designed to comply with applicable Korean laws—including the Personal Information Protection Act (PIPA)—and international data protection standards.",
    },
    {
      title: "What Data We Collect",
      content:
        "For registration purposes, we collect the following personal information:",
      points: ["Full Name", "Email Address", "Gender"],
      note: "Note: We do not collect your date of birth and therefore do not track users' ages.",
    },
    {
      title: "Use of the App and Age Limitations",
      points: [
        "Age Limitation: The App is intended for use by individuals who are 14 years of age and older.",
        "Minors Under 14: Although we do not directly collect age information, if it is determined or disclosed that a user is under 14, the account will be suspended pending the submission of proper parental or legal guardian consent. If such consent is not provided within a reasonable timeframe, the account will be terminated.",
        "Parental Consent: When provided, a legal guardian must review and agree to the terms and conditions on behalf of the minor. Access and any data provided by minors under 14 will be handled with extra care and strictly limited to the purposes stated in this policy.",
      ],
    },
    {
      title: "How We Use Your Data",
      content: "Your data is used solely for the following purposes:",
      points: [
        "Registration and Account Management: To create and manage your account.",
        "Communication: To send important updates or notifications regarding the App.",
        "Service Improvement: To analyze usage patterns and enhance the App's features.",
      ],
      additional:
        "We do not use your personal information for any purposes beyond those described above.",
    },
    {
      title: "Data Storage, Retention, and Security",
      subsections: [
        {
          title: "MongoDB Database",
          content:
            "We store your personal information using MongoDB—a proven, secure database platform. MongoDB employs robust security measures such as encryption (both at rest and in transit), strict access controls, and network isolation to protect sensitive data.",
          additional:
            "Your personal data is not sold to or shared with MongoDB or other third-party service providers. MongoDB is used solely as our secure database storage solution.",
        },
        {
          title: "Data Retention",
          content:
            "We retain your personal information for as long as required by Korean and applicable international laws. Once your data no longer serves its intended purpose, or upon your request (subject to mandatory retention periods), it will be securely and irreversibly destroyed.",
          points: [
            "Legal frameworks may require us to retain data for periods typically ranging from 3 to 5 years after a deletion request for audit, compliance, or legal obligations.",
          ],
        },
        {
          title: "Access and Security Controls",
          content:
            "Access to your personal information is strictly limited to designated personnel within Guọnọ Dictionary. We maintain robust data security through industry-standard measures and conduct periodic compliance reviews to ensure that our security practices remain effective.",
        },
      ],
    },
    {
      title: "Advertising and Data Usage for Ads",
      points: [
        "Ad Integration: The App may feature advertisements provided by third-party ad networks. These ad networks may collect and process certain data—such as device identifiers, usage data, and other technical information.",
        "Data Sharing for Advertising: Some of the data we collect (e.g., device information and usage patterns) may be shared with or accessed by our advertising partners in accordance with their own privacy policies.",
        "User Control: You may have options to manage your preferences for personalized advertising via your device or within the ad's own settings interface.",
        "Transparency: We encourage you to review the privacy policies of any third-party advertising providers integrated with the App.",
      ],
      additional:
        "We ensure that advertising partners are required to protect your data in a manner consistent with our own privacy practices and applicable laws.",
    },
    {
      title: "Compliance and Reviews",
      content:
        "While we do not conduct formal regular audits, we perform periodic compliance reviews to ensure that our data management practices meet both Korean legal requirements and our internal security standards. We are dedicated to updating our practices as necessary to maintain the highest level of data protection.",
    },
    {
      title: "Your Rights and Choices",
      points: [
        "Access & Correction: You have the right to request access to or correction of your personal data.",
        "Deletion: You may request deletion of your account and associated data, subject to the retention periods required by law.",
        "Contacting Us: If you wish to exercise your rights or have any inquiries regarding your personal data, please contact us through our official contact form on our website or via our official social media channels.",
      ],
    },
    {
      title: "Changes to This Privacy Policy",
      content:
        "We reserve the right to update this Privacy Policy as necessary to reflect changes in our practices or regulatory requirements. Should significant changes be made that affect your personal data, we will notify you via the App and update the effective date accordingly.",
    },
    {
      title: "Acknowledgement",
      content:
        "By using Guọnọ Dictionary, you acknowledge that you have read and understood this Privacy Policy and agree to its terms. If you do not agree with any part of this policy, please discontinue using the App.",
    },
  ];

  return (
    <>
      <main className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto backdrop-blur-sm rounded-xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="relative bg-[#05353A] p-6 sm:p-8 text-white flex items-center">
            {/* Back Button */}
            <button
              onClick={() => router.back()}
              className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-10 rounded-full hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-white/60"
              aria-label="Go back"
            >
              <IoArrowBack size={22} className="text-white" />
            </button>

            {/* Title & Last Updated */}
            <div className="flex-1 text-center">
              <h2 className="text-3xl sm:text-4xl font-bold mb-2">
                {t("Privacy Policy")}
              </h2>
              <p className="text-lg opacity-90">
                {t("Last updated:")}{" "}
                {new Date().toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 sm:p-8">
            <div className="prose prose-lg max-w-none">
              {sections.map((section, index) => (
                <section key={index} className="mb-10 last:mb-0">
                  <h3 className="text-2xl font-bold text-[#05353A] mb-4">
                    {t(section.title)}
                  </h3>

                  {section.content && (
                    <p className="text-gray-700 mb-4">{t(section.content)}</p>
                  )}

                  {section.points && (
                    <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
                      {section.points.map((point, i) => (
                        <li key={i}>{t(point)}</li>
                      ))}
                    </ul>
                  )}

                  {section.subsections &&
                    section.subsections.map((subsection, subIndex) => (
                      <div key={subIndex} className="mb-4">
                        <h3 className="text-xl font-semibold text-[#05353A] mb-2">
                          {t(subsection.title)}
                        </h3>
                        {subsection.content && (
                          <p className="text-gray-700 mb-2">
                            {t(subsection.content)}
                          </p>
                        )}
                        {subsection.points && (
                          <ul className="list-disc pl-6 mb-2 space-y-1 text-gray-700">
                            {subsection.points.map((point, i) => (
                              <li key={i}>{t(point)}</li>
                            ))}
                          </ul>
                        )}
                        {subsection.additional && (
                          <p className="text-gray-700">{t(subsection.additional)}</p>
                        )}
                      </div>
                    ))}

                  {section.note && (
                    <p className="text-gray-600 italic mb-4">{t(section.note)}</p>
                  )}

                  {section.additional && (
                    <p className="text-gray-700">{t(section.additional)}</p>
                  )}
                </section>
              ))}
            </div>

            {/* Footer Note */}
            <div className="mt-12 pt-6 border-t border-gray-200">
              <p className="text-center text-gray-500 text-sm">
                {t(
                  "For questions about this Privacy Policy, please contact us through our official channels."
                )}
              </p>
            </div>
          </div>
        </div>
      </main>
    </>


  );
};

export default PrivacyPolicy;

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "en", ["common"])),
  },
});
