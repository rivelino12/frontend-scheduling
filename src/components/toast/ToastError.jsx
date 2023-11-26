import React from "react";

const ToastError = ({ message }) => {
  return (
    <div className=" toast toast-top toast-center">
      <div className="font-semibold text-center text-white bg-red-500 alert alert-info">
        <span className="text-center">{message}</span>
      </div>
    </div>
  );
};

export default ToastError;
