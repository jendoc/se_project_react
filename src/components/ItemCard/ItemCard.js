import './ItemCard.css';
import imgPath from '../images/docs.jpg';

function ItemCard() {
    return(
        <>
        <div className="card">
        <h5 className="card__title">Boots</h5>
            <img className="card__image" 
            src={imgPath}
            />
        </div>
        </>
    )
}

export default ItemCard