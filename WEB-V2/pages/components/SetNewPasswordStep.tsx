import React, { useState } from "react";
import { MdArrowBack } from "react-icons/md";
import { toast } from "react-hot-toast";
import { RiLoader2Fill } from "react-icons/ri";
import { useTranslation } from "next-i18next";
import { resetPassword } from "@/utils/api-service";

interface SetNewPasswordStepProps {
  email: string;
  resetToken: string;
  onBack: () => void;
  onClose: () => void;
}

const SetNewPasswordStep: React.FC<SetNewPasswordStepProps> = ({ email, resetToken, onBack, onClose }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { t, i18n } = useTranslation("common");

  const getPasswordStrength = (password: string) => {
    if (password.length === 0) return { level: 0, text: "", color: "" };
    if (password.length < 8)
      return { level: 1, text: "Too Short", color: "bg-red-500" };

    let score = 0;
    if (password.length >= 8) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    const levels = [
      { text: "Very Weak", color: "bg-red-500" },
      { text: "Weak", color: "bg-orange-500" },
      { text: "Fair", color: "bg-yellow-500" },
      { text: "Good", color: "bg-blue-500" },
      { text: "Strong", color: "bg-green-500" },
    ];

    return {
      level: score,
      text: levels[score - 1]?.text || "Very Weak",
      color: levels[score - 1]?.color || "bg-red-500",
    };
  };

  const passwordStrength = getPasswordStrength(password);
  const passwordsMatch = password === confirmPassword && password.length > 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    if (!passwordsMatch) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const result = await resetPassword(email, resetToken, password, confirmPassword);
      if (result.success) {
        toast.success(result.message || "Password reset successfully");
        setTimeout(() => {
          onClose();
        }, 2000);
      } else {
        setError(result.error || "Failed to reset password");
        toast.error(result.error || "Failed to reset password");
      }
    } catch {
      setError("Network error. Please try again.");
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
          <h2 className="text-xl font-bold text-[#05353A]">{t("Set New Password")}</h2>
          <p className="text-sm text-[#05353A]/70">
            {t("Create a strong password for your account")}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-[#05353A] mb-2">
            {t("New Password")}
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (error) setError("");
              }}
              className="w-full p-3 rounded-xl border border-[#05353A]/20 focus:outline-none focus:ring-1 focus:ring-[#05353A] pr-10"
              placeholder={t("New Password")}
              required
            />
            <button
              type="button"
              className="absolute right-3 top-3 text-[#05353A]/70 hover:text-[#05353A]"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          {password.length > 0 && (
            <div className="mt-2">
              <div className="flex space-x-1 mb-1">
                {[1, 2, 3, 4, 5].map((level) => (
                  <div
                    key={level}
                    className={`h-1 flex-1 rounded ${
                      level <= passwordStrength.level
                        ? passwordStrength.color
                        : "bg-gray-200"
                    }`}
                  />
                ))}
              </div>
              <p
                className={`text-xs ${
                  passwordStrength.level >= 4
                    ? "text-green-600"
                    : passwordStrength.level >= 3
                      ? "text-blue-600"
                      : passwordStrength.level >= 2
                        ? "text-yellow-600"
                        : "text-red-600"
                }`}
              >
                {passwordStrength.text}
              </p>
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-[#05353A] mb-2">
            {t("Confirm Password")}
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                if (error) setError("");
              }}
              className={`w-full p-3 rounded-xl border focus:outline-none focus:ring-1 pr-10 ${
                confirmPassword.length > 0
                  ? passwordsMatch
                    ? "border-green-500 focus:ring-green-500"
                    : "border-red-500 focus:ring-red-500"
                  : "border-[#05353A]/20 focus:ring-[#05353A]"
              }`}
              placeholder={t("Confirm Password")}
              required
            />
            <button
              type="button"
              className="absolute right-3 top-3 text-[#05353A]/70 hover:text-[#05353A]"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? "Hide" : "Show"}
            </button>
          </div>
          {confirmPassword.length > 0 && !passwordsMatch && (
            <p className="text-red-500 text-sm mt-1">Passwords do not match</p>
          )}
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={isLoading || !passwordsMatch || password.length < 8}
          className="bg-[#05353A] text-white py-3 px-6 w-full rounded-lg font-medium hover:bg-[#05353A]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              Resetting Password...
              <RiLoader2Fill className="animate-spin ml-2" />
            </span>
          ) : (
            <p>{t("Reset Password")}</p>
          )}
        </button>
      </form>
    </div>
  );
};

export default SetNewPasswordStep;
