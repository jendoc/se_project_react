import { useContext } from "react";
import "./ItemCard.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemCard({ clothingOption, onClick }) {
  const currentUser = useContext(CurrentUserContext);
  // Check if the item was liked by the current user
  //const isLiked = clothingOption.likes.some((user) => user._id === currentUser._id);

  // Create a variable which you then set in `className` for the like button
  //const itemLikeButtonClassName = `...`;

  return (
    <li className="card" onClick={onClick}>
      <h5 className="card__title">{clothingOption.name}</h5>
      <img
        className="card__image"
        src={clothingOption.imageUrl}
        alt={clothingOption.name}
      />
    </li>
  );
}

export default ItemCard;
