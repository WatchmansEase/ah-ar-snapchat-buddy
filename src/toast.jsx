import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastProvider = () => <ToastContainer />;
export const showToast = (message) => {
  toast(message);
};

export default ToastProvider;
