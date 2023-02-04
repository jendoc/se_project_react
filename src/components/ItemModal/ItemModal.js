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
  //Checking if the current user is the owner of the current clothing item
  //const isOwn = card.owner._id === currentUser._id;

  //Creating a variable which you'll then set in `className` for the delete button
  // const itemDeleteButtonClassName = `item__delete-button ${
  //   isOwn ? "item__delete-button_visible" : "item__delete-button_hidden"
  // }`;

  //className={itemDeleteButtonClassName}

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
          <button  onClick={onDeleteClick}>
            Delete item
          </button>
          <h3 className="item-modal__weather">Weather: {card.weather}</h3>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
