import { useContext } from "react";
import "./ItemModal.css";
import CurrentUserContext from '../../contexts/CurrentUserContext';

function ItemModal({
  isOpen,
  type,
  card,
  onCloseModal,
  onDeleteClick
}) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser._id;

   const itemDeleteBtnClassName = `item-modal__delete-btn ${
     isOwn ? "item-modal__delete-btn_visible" : "item-modal__delete-btn_hidden"
   }`;

  return (
    <div
      className={
        isOpen
          ? `item-modal modal_name_${type}`
          : `modal_name_${type} item-modal_closed`
      }
    >
      <div className="item-modal__body">
        <button className="item-modal__close-btn" onClick={onCloseModal} />
        <img
          className="item-modal__image"
          src={card.imageUrl}
          alt={card.name}
        />
        <div className="item-modal__info">
          <h3 className="item-modal__name">{card.name}</h3>
          <button className={itemDeleteBtnClassName} onClick={onDeleteClick}>
            Delete item
          </button>
          <h3 className="item-modal__weather">Weather: {card.weather}</h3>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
