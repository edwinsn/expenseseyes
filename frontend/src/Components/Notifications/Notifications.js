import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function Notifications() {
  const errors = useSelector((state) => state.errors);

  useEffect(() => {
    if (errors.length > 0) {
      toast.error(errors[errors.length - 1].message);
    }
  }, [errors]);

  return <ToastContainer />;
}
