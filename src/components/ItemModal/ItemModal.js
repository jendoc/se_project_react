import "./ItemModal.css";

function ItemModal({ isOpen, type, card, onClose}) {

  return (
    <>
      <div className={isOpen ? `modal_type_${type} item-modal__opened` : `modal_type_${type}`}>
        <div className="item-modal__body">
          <button className="item-modal__close-btn" onClick={onClose}></button>
          <img className="item-modal__image"
          src={"https://images.unsplash.com/photo-1511447333015-45b65e60f6d5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1255&q=80"}
          alt={"Something here"}
          />
          <h3 className="item-modal__name">{card.name}</h3>
          <h3 className="item-modal__weather">Weather: spicy</h3>
        </div>
      </div>
    </>
  );
}

export default ItemModal;
