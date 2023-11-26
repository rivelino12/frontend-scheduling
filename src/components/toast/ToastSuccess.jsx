import React from "react";

const ToastSuccess = ({ message }) => {
  return (
    <div className="toast toast-top toast-center">
      <div className="alert alert-info">
        <span>{message}</span>
      </div>
    </div>
  );
};

export default ToastSuccess;
