import { useContext } from "react";
import "./ItemCard.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemCard({
  clothingOption,
  handleCardClick,
  handleLikeClick,
  isLoggedIn,
}) {
  const currentUser = useContext(CurrentUserContext);
  const isLiked = clothingOption.likes.some((like) => like === currentUser.id);

  const itemLikeButtonClassName = `${
    isLiked ? "card__like-btn_liked" : "card__like-btn"
  }`;

  return (
    <li className="card">
      <div className="card__info">
        <h5 className="card__title">{clothingOption.name}</h5>
        <button
          className={
            isLoggedIn ? itemLikeButtonClassName : "card__like-btn_hidden"
          }
          onClick={handleLikeClick}
        ></button>
      </div>
      <img
        className="card__image"
        src={clothingOption.imageUrl}
        alt={clothingOption.name}
        onClick={handleCardClick}
      />
    </li>
  );
}

export default ItemCard;
