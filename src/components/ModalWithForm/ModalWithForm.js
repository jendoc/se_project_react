import "./ModalWithForm.css";

function ModalWithForm() {
  return (
    <>
      <div className="modal__wrapper">
        <div className="modal__body">
          <button className="modal__close-btn"></button>
          <form className="modal__form">
            <h3 className="modal__title">Modal Form Title</h3>
            <label className="modal__input-label">Name</label>
            <input className="modal__form-input_text"></input>
            <label className="modal__input-label">Image</label>
            <input className="modal__form-input_text"></input>
            <label className="modal__input-label">Select the weather type:</label>
            <button className="modal__form-submit-btn modal__form-submit-btn_disabled" disabled>
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default ModalWithForm;
