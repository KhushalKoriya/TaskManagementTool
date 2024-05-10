import React from "react";
import "./Deletemodal.css";
import Button from "../common/Button";

const DeleteConfirmationDialog = ({ onConfirm, onCancel }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Confirm Deletion</h5>
          <button type="button" className="btn-close" onClick={onCancel} aria-label="Close"></button>
        </div>
        <div className="modal-body">
          Are you sure you want to delete this task?
        </div>
        <div className="modal-footer">
          <Button
            onClick={onCancel}
            text="No"
            color="secondary"
          />
          <Button
            onClick={onConfirm}
            text="Yes"
            color="primary"
          />
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationDialog;
