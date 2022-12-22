import "../../blocks/ItemModal/ItemModal.css";

function ItemModal({ isOpen, name, card, onCloseModal, onDeleteClick }) {
  return (
    <div
      className={
        isOpen
          ? `item-modal modal_name_${name}`
          : `modal_name_${name} item-modal_closed`
      }
    >
      <div className="item-modal__body">
        <button className="item-modal__close-btn" onClick={onCloseModal} />
        <img className="item-modal__image" src={card.imageUrl} alt={card.name} />
        <div className="item-modal__info">
        <h3 className="item-modal__name">{card.name}</h3>
        <button className="item-modal__delete-btn" onClick={onDeleteClick}>Delete item</button>
        <h3 className="item-modal__weather">Weather: {card.weather}</h3>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
