import "./ItemCard.css";

function ItemCard({ clothingOption, handleCardClick }) {

  const handleClick = (evt) => {
    console.log(clothingOption)
    evt.preventDefault();
    handleCardClick(clothingOption)
  }

  return (
    <>
      <li className="card" onClick={handleClick}>
        <h5 className="card__title">{clothingOption.name}</h5>
        <img className="card__image" src={clothingOption.link} alt={clothingOption.name}/>
      </li>
    </>
  );
}

export default ItemCard;
