import "../../blocks/ItemCard/ItemCard.css";

function ItemCard({ clothingOption, onClick }) {
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
