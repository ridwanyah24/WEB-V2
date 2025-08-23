"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import PhoneLayout from "./components/layouts/PhoneLayout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import type { GetStaticProps } from "next";
import { useTranslation } from "next-i18next";
import RequestResetStep from "./components/RequestResetStep";
import OTPVerificationStep from "./components/OTPVerificationStep";
import SetNewPasswordStep from "./components/SetNewPasswordStep";
import VerifyUserStep from "./components/VerifyUser";

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  profilePictureUrl: string;
}

export default function ForgotPassword() {
  const { t, i18n } = useTranslation("common");
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [language, setLanguage] = useState("urh"); // Default Urhobo

  // Ensure Urhobo loads as default
  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language, i18n]);

  const handleStep1Complete = (userInfo: User) => {
    setUser(userInfo);
    setEmail(userInfo.email);
    setCurrentStep(2);
  };

  const handleStep2Complete = (userId: string, userEmail: string) => {
    setEmail(userEmail);
    setCurrentStep(3);
  };

  const handleStep3Complete = (resetToken: string) => {
    setResetToken(resetToken);
    setCurrentStep(4);
  };

  const handleBack = () => {
    if (currentStep === 2) setCurrentStep(1);
    else if (currentStep === 3) setCurrentStep(2);
    else if (currentStep === 4) setCurrentStep(3);
  };

  const handleClose = () => {
    router.push("/signin");
  };

  return (
    <main className="min-h-screen text-[#05353A] bg-[#E9F9F9] grid grid-cols-1 lg:grid-cols-2">
      {/* Phone Preview */}
      <PhoneLayout />

      {/* Forgot Password Form */}
      <section className="flex justify-center items-center mx-auto">
        <div
          className="bg-[#05353A] rounded-3xl w-[330px] md:w-[500px] min-h-[600px] max-h-[700px] overflow-y-auto"
          aria-label="forgot password form"
        >
          <div className="px-4 md:px-8 py-12">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-white">
                {t("forgotPassword")}
              </h2>
              <div className="flex items-center gap-4">
                {/* Language Toggle */}
                <button
                  onClick={() =>
                    setLanguage(language === "en" ? "urh" : "en")
                  }
                  className="bg-[#F5DEB3] text-[#05353A] px-3 py-1 rounded-md text-sm font-medium"
                >
                  {language === "en" ? "Urhobo" : "English"}
                </button>

                <Link
                  href="/signin"
                  className="text-[#F5DEB3] hover:text-[#F5DEB3]/80 transition-colors text-xl"
                >
                  ✕
                </Link>
              </div>
            </div>

            {/* Progress Dots */}
            <div className="flex justify-center mb-6">
              <div className="flex space-x-2">
                {[1, 2, 3, 4].map((step) => (
                  <div
                    key={step}
                    className={`w-3 h-3 rounded-full ${
                      step <= currentStep ? "bg-[#F5DEB3]" : "bg-[#F5DEB3]/20"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Step Components */}
            <div className="bg-white rounded-xl p-6">
              {currentStep === 1 && (
                <VerifyUserStep onNext={handleStep1Complete} onClose={handleClose} />
              )}
              {currentStep === 2 && (
                <RequestResetStep
                  user={user}
                  onNext={handleStep2Complete}
                  onClose={handleClose}
                  onBack={handleBack}
                />
              )}
              {currentStep === 3 && (
                <OTPVerificationStep
                  email={email as string}
                  userId={user?.id as string}
                  onNext={handleStep3Complete}
                  onBack={handleBack}
                />
              )}
              {currentStep === 4 && (
                <SetNewPasswordStep
                  email={email}
                  resetToken={resetToken}
                  onBack={handleBack}
                  onClose={handleClose}
                />
              )}
            </div>

            <div className="text-center text-base font-normal mt-6 text-white">
              {t("Back to")}{" "}
              <Link href="/signin" className="text-[#f5deb3]">
                {t("Login")}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "urhobo", ["common"])), // Urhobo default
  },
});
