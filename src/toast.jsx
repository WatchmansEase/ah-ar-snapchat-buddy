import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastProvider = () => <ToastContainer />;
export const showToast = (message) => {
  toast(<div style={{ fontWeight: "bold" }}>{message}</div>);
};

export default ToastProvider;
