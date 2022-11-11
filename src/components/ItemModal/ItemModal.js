import "./ItemModal.css";

function ItemModal({ isOpen, name, card, onClose}) {

  return (
    <>
      <div className={isOpen ? `"modal_type_${name} item-modal__opened"` : `"modal_type_${name}"`}>
        <div className="item-modal__body">
          <button className="item-modal__close-btn" onClick={onClose}></button>
          <img className="item-modal__image"
          src={card.link}
          alt={card.name}
          />
          <h3 className="item-modal__name">{card.name}</h3>
          <h3 className="item-modal__weather">Weather: {card.weather}</h3>
        </div>
      </div>
    </>
  );
}

export default ItemModal;
