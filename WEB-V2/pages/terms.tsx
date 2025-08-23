import React from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import type { GetStaticProps } from "next";
import { useTranslation } from "next-i18next";

const TermsAndConditions = () => {
  const { t } = useTranslation("common");

  const sections = [
    {
      title: "Effective Upon Use",
      content:
        "Welcome to Guọnọ Dictionary (“Guọnọ” & “App”), managed by GUỌNỌ. These Terms & Conditions (“Terms”) govern your use of the App. By using Guọnọ Dictionary, you agree to these Terms.",
    },
    {
      title: "Purpose of Use",
      content:
        "Guọnọ Dictionary is an educational and cultural resource designed for:",
      points: [
        "Personal learning and enrichment",
        "Linguistic and cultural research",
        "Promoting everyday use of the Urhobo language",
      ],
      additional:
        "We encourage open access and respectful use that supports Urhobo language revitalization and awareness.",
    },
    {
      title: "Content Sharing & Intellectual Property",
      content:
        "The content within Guọnọ Dictionary—including definitions, examples, and lessons—can be freely copied, shared, or redistributed without restriction. Users are encouraged to promote the language with or without attribution.",
      points: [
        "The platform's structure, games, and organization are developed by GUỌNỌ and offered under a spirit of open access.",
        "Please do not misrepresent the content or use it for harmful purposes.",
        "Any content you submit must be your own or provided with the proper rights to share.",
        "GUỌNỌ is not responsible for any third-party intellectual property rights that may be inadvertently included in user submissions.",
      ],
    },
    {
      title: "Account Registration & Security",
      content:
        "Creating an account allows access to personalized features and tracking. When registering, you agree to:",
      points: [
        "Provide accurate and complete information.",
        "Maintain the security and confidentiality of your login details.",
        "Accept full responsibility for all activities that occur under your account.",
      ],
    },
    {
      title: "Eyeyono: A Living Learning System",
      content:
        "Guọnọ Dictionary reflects our motto: Eyeyono, meaning continuous learning and education. Language evolves—and so do we. Content may be updated as we grow in knowledge.",
    },
    {
      title: "Game Features and Points",
      content:
        "Our App includes interactive learning games. Users can earn points, which may be redeemable with future partners. There are no current paid features.",
    },
    {
      title: "User Submissions & Posted Content",
      content:
        "Users may soon be able to submit words, corrections, or other content (e.g., text, suggestions, examples) to Guọnọ Dictionary. By posting or submitting any content, you grant GUỌNỌ the unrestricted, royalty-free, global right to use, adapt, edit, and publish that content. You affirm that you have the right to share the submitted content.",
    },
    {
      title: "Acceptable Use",
      content: "You must not:",
      points: [
        "Post disrespectful, false, or harmful information.",
        "Abuse app features or mislead others.",
        "Pretend to represent GUỌNỌ without consent.",
      ],
      additional:
        "Repeated violations of these guidelines may result in account restrictions or permanent termination.",
    },
    {
      title: "Cultural & Dialect Disclaimer",
      content:
        "Urhobo has diverse dialects. We strive to represent commonly accepted forms while honoring variations. Community input helps shape our accuracy and inclusiveness.",
    },
    {
      title: "Limitation of Liability",
      content:
        "Guọnọ Dictionary is provided 'as is.' GUỌNỌ is not liable for any damages, losses, or inaccuracies resulting from the use of the App. This includes any reliance on user-generated content for which we do not endorse or guarantee accuracy. Use the App at your own discretion.",
    },
    {
      title: "Governing Law & Modifications",
      content:
        "These Terms are governed by the laws of the Republic of Korea. Any disputes will be resolved through the courts of Korea. GUỌNỌ reserves the right to modify these Terms at any time. Significant changes that affect your rights or obligations will be communicated via the App and/or our website, and the updated Terms will be effective upon posting.",
    },
    {
      title: "Privacy Policy",
      content:
        "Your privacy is important to us. Please review our Privacy Policy to understand how we collect, use, and protect your personal data.",
    },
    {
      title: "Contact",
      content:
        "For support, questions, or partnership inquiries, please contact us via our official website contact form or through our social media channels. Details for these channels are available on our website.",
      additional:
        "We welcome collaboration, sponsorship, and contributions from individuals and organizations passionate about the Urhobo language and culture. If you do not agree with any part of these Terms, please discontinue using the App.",
    },
  ];

  return (
    <main className="min-h-screen  py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto  backdrop-blur-sm rounded-xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-[#05353A] p-6 sm:p-8 text-white">
          <h2 className="text-3xl sm:text-4xl font-bold mb-2">
            {t("Terms and Conditions")}
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

        {/* Content */}
        <div className="p-6 sm:p-8">
          <div className="prose prose-lg max-w-none">
            {sections.map((section, index) => (
              <section key={index} className="mb-10 last:mb-0">
                <h3 className="text-2xl font-bold text-[#05353A] mb-4">
                  {t(section.title)}
                </h3>
                <p className="text-gray-700 mb-4">{t(section.content)}</p>

                {section.points && (
                  <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
                    {section.points.map((point, i) => (
                      <li key={i}>{t(point)}</li>
                    ))}
                  </ul>
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
                "By using Guọnọ, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.",
              )}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default TermsAndConditions;

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "en", ["common"])),
  },
});
