import React from "react";

interface SuccessModalProps {
  show: boolean;
  onClose: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
        <h2 className="text-2xl font-bold text-[#0F6F7C] mb-4">
          Thank you for your quote!
        </h2>
        <p className="text-gray-700 mb-6">
          You will shortly receive the information in your email.
        </p>
        <button
          onClick={onClose}
          className="bg-[#0F6F7C] text-white px-6 py-3 rounded-full hover:bg-teal-700 transition-colors"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;
