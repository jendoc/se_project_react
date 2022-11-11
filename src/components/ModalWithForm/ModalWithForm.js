import "./ModalWithForm.css";

function ModalWithForm({ isOpen, name, title, buttonText, onClose, children }) {
  return (
    <>
      <div
        className={
          isOpen ? `modal_type_${name} modal__opened` : `modal_type_${name}`
        }
      >
        <div className="modal__body">
          <button
            className="modal__close-btn"
            onClick={onClose}
            type="button"
          ></button>
          <h3 className="modal__title">{title}</h3>
          <form className="modal__form" name={name}>
            {children}
            <button
              className="modal__form-submit-btn modal__form-submit-btn_disabled"
              disabled
            >
              {buttonText}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default ModalWithForm;
