import "./ItemModal.css";
import imgPath from "../images/docs.jpg";

function ItemModal() {
  return (
    <>
      <div className="modal__wrapper_item">
        <div className="modal__body">
          <button className="modal__close-btn"></button>
          <img className="modal__item-image"
          src={imgPath}
          />
          <h3 className="modal__item-name">Boots</h3>
          <h3 className="modal__item-weather">Weather: Cold</h3>
        </div>
      </div>
    </>
  );
}

export default ItemModal;
