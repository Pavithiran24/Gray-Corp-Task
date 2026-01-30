import React from 'react';

interface ThankYouPopupProps {
  open: boolean;
  onClose: () => void;
}

const ThankYouPopup: React.FC<ThankYouPopupProps> = ({ open, onClose }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 text-center relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          ×
        </button>
        <div className="text-5xl mb-4 text-red-500">❤️</div>
        <h2 className="text-2xl font-bold mb-2">Thank you so much!</h2>
        <p className="text-lg">We appreciate your login.</p>
      </div>
    </div>
  );
};

export default ThankYouPopup;
