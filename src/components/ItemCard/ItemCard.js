import { useContext, useState } from "react";
import "./ItemCard.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemCard({
  clothingOption,
  handleCardClick,
  handleLikeClick,
  isLoggedIn,
}) {
  const currentUser = useContext(CurrentUserContext);
  const currentUserId = currentUser._id || null;
  const [isLiked, setIsLiked] = useState(
    clothingOption.likes.includes(currentUserId)
  );

  const itemLikeButtonClassName = isLoggedIn
    ? `${isLiked ? "card__like-btn_liked" : "card__like-btn"}`
    : "card__like-btn_hidden";

  return (
    <li className="card">
      <div className="card__info">
        <h5 className="card__title">{clothingOption.name}</h5>
        <button
          className={itemLikeButtonClassName}
          onClick={() => {
            handleLikeClick(clothingOption._id, isLiked);
            setIsLiked(!isLiked);
          }}
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
