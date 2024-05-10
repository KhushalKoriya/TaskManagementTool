import React from "react";

const DeleteMessage = () => {
  return (
    <div className="alert alert-danger alert-dismissible fade show" role="alert">
      You have deleted task Successfully.
      <button
        type="button"
        className="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
      ></button>
    </div>
  );
};

export default DeleteMessage;
