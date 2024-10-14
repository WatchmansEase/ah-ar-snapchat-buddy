import React from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "./toast.css";

const Toast = () => {
  return (
    <div className="toast-wrapper"> {/* Wrap ToastContainer inside a div */}
      <ToastContainer />
    </div>
  );
};

// Helper functions for different types of toasts
export const showSuccessToast = (message) => {
  toast.success(message);
};

export const showErrorToast = (message) => {
  toast.error(message);
};

export default Toast;
