import React from "react";

interface ToastProps {
  type: "success" | "error" | "info"; // Added 'info' type
  message: string;
  desc?: string;
  toastId: string;
}

const TedxToast: React.FC<ToastProps> = ({ type, message, toastId, desc }) => {
  let backgroundColor;
  let textColor;

  switch (type) {
    case "success":
      backgroundColor = "bg-green-500";
      textColor = "text-white";
      break;
    case "error":
      backgroundColor = "bg-red-600";
      textColor = "text-white";
      break;
    case "info":
      backgroundColor = "bg-azure-600"; // Blue background for info
      textColor = "text-white";
      break;
    default:
      backgroundColor = "bg-gray-700"; // Fallback color
      textColor = "text-white";
  }

  return (
    <div
      className={`${
        toastId ? "animate-enter" : "animate-leave"
      } max-w-xs w-full ${backgroundColor} shadow-lg rounded-lg pointer-events-auto flex`}
    >
      <div className="flex-1 w-0 p-3">
        <div className="flex items-center">
          <div className="ml-3 flex-1">
            <p className={`text-base font-medium ${textColor}`}>{message}</p>
            <p className={`mt-1 text-sm ${textColor}`}>{desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TedxToast;