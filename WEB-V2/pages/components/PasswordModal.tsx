import React from "react";
import ForgotPasswordModal from "./ForgotPasswordModal";

interface PasswordModalProps {
  closeModal: () => void;
}

const PasswordModal: React.FC<PasswordModalProps> = ({ closeModal }) => {

  const handleCloseForgotPassword = () => {
    closeModal();
  };

  return (
    <div className="fixed inset-0 backdrop-blur-lg bg-black/20 flex items-center justify-center z-50">
      <ForgotPasswordModal closeModal={handleCloseForgotPassword} />
    </div>
  );
};

export default PasswordModal;
