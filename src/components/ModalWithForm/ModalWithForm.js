import "../../blocks/ModalWithForm/ModalWithForm.css";

function ModalWithForm({
  isOpen,
  type,
  title,
  buttonText,
  onCloseModal,
  onSubmit,
  children
}) {
  return (
    <>
      <div
        className={
          isOpen
            ? `modal_type_${type} modal`
            : `modal_type_${type} modal_closed`
        }
      >
        <div className="modal__body">
          <button
            className="modal__close-btn"
            onClick={onCloseModal}
            type="button"
          />
          <h3 className="form__title">{title}</h3>
          <form
            className="modal__form"
            type={type}
            onSubmit={onSubmit}
          >
            {children}
            <button
              className="modal__form-submit-btn modal__form-submit-btn"
              type="submit"
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
