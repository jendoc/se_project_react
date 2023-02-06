import { useContext } from "react";
import "./ItemCard.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemCard({ clothingOption, onClick, handleLikeClick, isLoggedIn }) {
  const currentUser = useContext(CurrentUserContext);
  const isLiked = clothingOption.likes.some((like) => like === currentUser._id);

  const itemLikeButtonClassName = isLiked ? "card__like-btn_liked" : "card__like-btn";

  return (
    <li className="card" onClick={onClick}>
      <h5 className="card__title">{clothingOption.name}</h5>
      <button
        className={isLoggedIn ? itemLikeButtonClassName : "card__like-btn_hidden"}
        onClick={handleLikeClick}
      ></button>
      <img
        className="card__image"
        src={clothingOption.imageUrl}
        alt={clothingOption.name}
      />
    </li>
  );
}

export default ItemCard;
