import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { RiLoader2Fill } from "react-icons/ri";
import { verifyUser } from "@/utils/api-service";
import { User } from "./ForgotPasswordModal";

interface VerifyUserStepProps {
  onNext: (user: User) => void;
  onClose: () => void;
  onBack?: () => void;
}

const VerifyUserStep: React.FC<VerifyUserStepProps> = ({ onNext, onBack }) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setError("Please enter your email address");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const result = await verifyUser(email.trim());
      if (result.success) {
        toast.success(result.data.message || "User verified successfully");
        onNext(result.data.userInfo);
      } else {
        setError(result.error || "Failed to verify user");
        toast.error(result.error || "Failed to verify user");
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
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold text-[#05353A] mb-2">
          Verify User
        </h2>
        <p className="text-sm text-[#05353A]/70">
          Enter your email address to verify your account
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-[#05353A] mb-2">
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (error) setError("");
            }}
            className="w-full p-3 rounded-xl border border-[#05353A]/20 focus:outline-none focus:ring-1 focus:ring-[#05353A]"
            placeholder="Enter your email address"
            required
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>

        <div className="flex space-x-3">
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              className="flex-1 py-3 px-6 border border-[#05353A] text-[#05353A] rounded-lg font-medium hover:bg-[#05353A]/10 transition-colors"
            >
              Back
            </button>
          )}
          <button
            type="submit"
            disabled={isLoading}
            className={`py-3 px-6 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
              onBack 
                ? "flex-1 bg-[#05353A] text-white hover:bg-[#05353A]/90" 
                : "w-full bg-[#05353A] text-white hover:bg-[#05353A]/90"
            }`}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                Verifying...
                <RiLoader2Fill className="animate-spin ml-2" />
              </span>
            ) : (
              "Verify User"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default VerifyUserStep;
