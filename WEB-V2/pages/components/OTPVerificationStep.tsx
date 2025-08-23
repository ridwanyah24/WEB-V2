import React, { useState, useRef } from "react";
import { MdArrowBack } from "react-icons/md";
import { toast } from "react-hot-toast";
import { RiLoader2Fill } from "react-icons/ri";
import { verifyResetOTP, requestPasswordReset } from "@/utils/api-service";
import { useTranslation } from "next-i18next";

interface OTPVerificationStepProps {
  email: string;
  userId: string;
  onNext: (resetToken: string) => void;
  onBack: () => void;
}

const OTPVerificationStep: React.FC<OTPVerificationStepProps> = ({
  email,
  userId,
  onNext,
  onBack,
}) => {
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const { t, i18n } = useTranslation("common");

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
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
    if (fullOtp.length !== 6) {
      setError("Please enter the complete 6-digit code");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const result = await verifyResetOTP(email, fullOtp);

      if (result.success) {
        toast.success(result.message || "OTP verified successfully");

        onNext(result.resetToken);
      } else {
        setError(result.error || "Invalid OTP");
        toast.error(result.error || "Invalid OTP");
        setOtp(new Array(6).fill(""));
        inputRefs.current[0]?.focus();
      }
    } catch {
      setError("Network error. Please try again.");
      toast.error("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setIsLoading(true);
    try {
      const result = await requestPasswordReset(email, userId);

      if (result.success) {
        toast.success(result.message || "Reset code resent successfully");
      } else {
        toast.error(result.error || "Failed to resend code");
      }
    } catch {
      toast.error("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center mb-6">
        <button
          onClick={onBack}
          className="text-[#05353A] hover:text-[#05353A]/80 transition-colors mr-3"
        >
          <MdArrowBack size={24} />
        </button>
        <div>
          <h2 className="text-xl font-bold text-[#05353A]">{t("Verify Code")}</h2>
          <p className="text-sm text-[#05353A]/70">
            {t("Enter the 6-digit code sent to")} {email}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-[#05353A] mb-3">
            {t("Verification Code")}
          </label>
          <div className="flex justify-center space-x-2">
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
                className="w-12 h-12 text-center text-lg rounded-lg border border-[#05353A]/20 bg-white focus:outline-none focus:ring-1 focus:ring-[#05353A]"
                inputMode="numeric"
                pattern="\d"
                required
              />
            ))}
          </div>
          {error && (
            <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
          )}
        </div>

        <div className="text-center">
          <button
            type="button"
            onClick={handleResendOTP}
            disabled={isLoading}
            className="text-[#05353A] text-sm hover:underline disabled:opacity-50"
          >
            {t("Didn't receive a code")}? {t("Resend Code")}
          </button>
        </div>

        <button
          type="submit"
          disabled={isLoading || otp.join("").length !== 6}
          className="bg-[#05353A] text-white py-3 px-6 w-full rounded-lg font-medium hover:bg-[#05353A]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              Verifying...
              <RiLoader2Fill className="animate-spin ml-2" />
            </span>
          ) : (
            <p>{t("Verify Code")}</p>
          )}
        </button>
      </form>
    </div>
  );
};

export default OTPVerificationStep;
