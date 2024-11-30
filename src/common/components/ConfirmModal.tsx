import React from "react";
import { TiDelete } from "react-icons/ti";

interface ConfirmModalProps {
  isOpen: boolean; // Controls visibility of the modal
  title?: string; // Modal title
  message?: string; // Modal message
  onConfirm: () => void; // Action for the "Continue" button
  onCancel: () => void; // Action for the "Cancel" button
  confirmText?: string; // Text for the "Continue" button
  cancelText?: string; // Text for the "Cancel" button
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  title = "Confirm Action",
  message = "Are you sure you want to continue?",
  onConfirm,
  onCancel,
  confirmText = "Continue",
  cancelText = "Cancel",
}) => {
  if (!isOpen) return null; // Don't render the modal if it's not open

  return (
    <div
      onClick={onCancel} // Close modal when clicking outside
      className="absolute w-full h-full inset-0 bg-azure-100 backdrop-blur-md bg-opacity-50 flex items-center justify-center z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()} // Prevent click propagation to the backdrop
        className="bg-white p-6 rounded-lg shadow-lg w-96"
      >
        <div className="w-full flex items-center justify-center">
          <TiDelete className="text-5xl text-red-600" />
        </div>
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-lg font-semibold mb-4">{title}</h2>
          <div className="text-gray-700 mb-6">{message}</div>
        </div>
        <div className="mt-1 flex justify-center items-center space-x-2">
          <button
            onClick={onCancel}
            className="bg-red-50 w-[8rem] text-red-600 px-4 py-2 rounded-lg hover:bg-gray-400"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-600 w-[8rem] text-white px-4 py-2 rounded-lg hover:bg-red-800"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
