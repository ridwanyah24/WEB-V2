import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import RequestResetStep from "./RequestResetStep";
import OTPVerificationStep from "./OTPVerificationStep";
import SetNewPasswordStep from "./SetNewPasswordStep";
import VerifyUserStep from "./VerifyUser";

interface ForgotPasswordModalProps {
  closeModal: () => void;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  profilePictureUrl: string;
}

const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({
  closeModal,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState("");
  const [resetToken, setResetToken] = useState("");

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
    if (currentStep === 2) {
      setCurrentStep(1);
    } else if (currentStep === 3) {
      setCurrentStep(2);
    } else if (currentStep === 4) {
      setCurrentStep(3);
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur-lg bg-black/20 flex items-center justify-center z-50">
      <section className="bg-[#f2feff] p-6 rounded-xl w-full max-w-md shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-[#05353A]">Forgot Password</h2>
          <button
            onClick={closeModal}
            className="text-[#05353A] hover:text-[#05353A]/80 transition-colors"
          >
            <MdClose size={24} />
          </button>
        </div>

        <div className="flex justify-center mb-6">
          <div className="flex space-x-2">
            {[1, 2, 3, 4].map((step) => (
              <div
                key={step}
                className={`w-3 h-3 rounded-full ${
                  step <= currentStep ? "bg-[#05353A]" : "bg-[#05353A]/20"
                }`}
              />
            ))}
          </div>
        </div>

        {currentStep === 1 && (
          <VerifyUserStep onNext={handleStep1Complete} onClose={closeModal} />
        )}

        {currentStep === 2 && (
          <RequestResetStep 
            user={user}
            onNext={handleStep2Complete} 
            onClose={closeModal}
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
            onClose={closeModal}
          />
        )}
      </section>
    </div>
  );
};

export default ForgotPasswordModal;
