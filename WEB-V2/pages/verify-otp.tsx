"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import PhoneLayout from "./components/layouts/PhoneLayout";
import { useRouter } from "next/router";
import { RiLoader2Fill } from "react-icons/ri";
import { toast } from "react-hot-toast";
import { getItem } from "@/utils/page-manager";
import { verifyOTP, resendOTP } from "@/utils/api-service";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import type { GetStaticProps } from "next";
import { useTranslation } from "next-i18next";

export default function VerifyOTP() {
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const [submissionStarted, setSubmissionStarted] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const email = getItem("email");
  const router = useRouter();

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return; // Only allow numbers

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus to next input
    if (value && index < 5 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      // Move focus to previous input on backspace
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text/plain").slice(0, 6);
    if (/^\d+$/.test(pasteData)) {
      const pasteArray = pasteData.split("");
      const newOtp = [...otp];
      pasteArray.forEach((char, i) => {
        if (i < 6) newOtp[i] = char;
      });
      setOtp(newOtp);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fullOtp = otp.join("");
    if (fullOtp.length !== 6) return;

    setSubmissionStarted(true);
    const result = await verifyOTP(fullOtp, email);

    if (result.success) {
      toast.success(result.message);
      router.push("/signin");
    } else {
      toast.error(result.error);
    }

    setSubmissionStarted(false);
  };

  const handleResendOTP = async () => {
    console.log("user email", email);
    const result = await resendOTP(email);

    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(result.error);
    }
  };
  const { t } = useTranslation("common");

  return (
    <main className="min-h-screen text-white bg-[#E9F9F9] grid grid-cols-1 lg:grid-cols-2">
      {/* Phone Preview */}
      <PhoneLayout />

      {/* OTP Verification Form */}
      <section className="flex justify-center items-center mx-auto w-full">
        <div
          className="bg-[#073B3A] rounded-3xl w-[330px] md:w-[500px] p-8 md:p-12 shadow-lg"
          aria-label="OTP verification form"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-2xl font-semibold mb-2">Verify Your Account</h2>
            <p className="mb-6 text-xl font-medium text-[#BEBEBE]">
              {t("Enter the 6-digit code sent to your email")}
            </p>

            {/* OTP Inputs */}
            <div className="flex  space-x-2 md:space-x-6">
              {Array.from({ length: 6 }).map((_, index) => (
                <input
                  key={index}
                  ref={(el) => {
                    inputRefs.current[index] = el;
                  }}
                  type="text"
                  value={otp[index]}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  maxLength={1}
                  className="w-10 h-12 md:w-12 md:h-14 text-center text-xl rounded-md border border-[#BEBEBE] bg-[#073B3A] text-white focus:outline-none focus:ring-2 focus:ring-[#F5DEB3]"
                  aria-required="true"
                  inputMode="numeric"
                  pattern="\d"
                  required
                />
              ))}
            </div>

            {/* Resend Code */}
            <div className="text-center text-[#BEBEBE] mb-8">
              <p>
                {t("Didn't receive a code?")}{" "}
                <button
                  type="button"
                  onClick={handleResendOTP}
                  className="text-[#F5DEB3] hover:underline"
                >
                  {t("Resend code")}
                </button>
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submissionStarted || otp.join("").length !== 6}
              className={`w-full py-3 rounded-md bg-[#F9E1BE] text-[#073B3A] font-bold hover:bg-[#F5DEB3] transition-colors focus:outline-none focus:ring-2 focus:ring-[#F5DEB3] focus:ring-offset-2 focus:ring-offset-[#073B3A] ${
                submissionStarted || otp.join("").length !== 6
                  ? "opacity-80 cursor-not-allowed"
                  : ""
              }`}
            >
              {submissionStarted ? (
                <span className="flex items-center justify-center">
                  {t("Verifying...")}
                  <RiLoader2Fill className="animate-spin" />
                </span>
              ) : (
                t("Verify Account")
              )}
            </button>

            {/* Back to Sign In */}
            <p className="text-center text-base font-normal mt-4 text-white">
              {t("Back to")}{" "}
              <Link href="/signin" className="text-[#F9E1BE]">
                {t("Sign in")}
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
