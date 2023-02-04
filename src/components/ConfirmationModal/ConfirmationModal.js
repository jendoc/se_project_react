import React from "react";
import "./ConfirmationModal.css";

const ConfirmationModal = ({ isOpen, type, onCloseModal, onCardDelete }) => {
  return (
    <div
      className={
        isOpen
          ? `confirm-modal modal_name_${type}`
          : `modal_name_${type} confirm-modal_closed`
      }
    >
      <div className="confirm-modal__body">
        <button className="confirm-modal__close-btn" onClick={onCloseModal} />
        <h3 className="confirm-modal__title">
          Are you sure you want to delete this item? <br></br> This action is
          irreversible.
        </h3>
        <button className="confirm-modal__delete-btn" onClick={onCardDelete}>
          Yes, delete item
        </button>
        <button className="confirm-modal__cancel-btn" onClick={onCloseModal}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ConfirmationModal;
