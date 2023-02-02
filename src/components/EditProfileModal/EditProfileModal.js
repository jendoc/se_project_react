import React, { useEffect, useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const EditProfileModal = ({ isOpen, onCloseModal, currentUser }) => {
  useEffect(() => {
    setName(currentUser.name);
    setAvatar(currentUser.avatar);
  }, [isOpen]);
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  return (
    <ModalWithForm
      isOpen={isOpen}
      type="update"
      title="Change profile data"
      buttonText="Save changes"
      onCloseModal={onCloseModal}
    >
      <h4>Name*</h4>
      <input
        className="form__input"
        name="name"
        type="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      ></input>
      <h4>Avatar*</h4>
      <input
        className="form__input"
        name="avatar"
        type="url"
        value={avatar}
        onChange={(e) => setAvatar(e.target.value)}
        placeholder="Avatar URL"
      ></input>
    </ModalWithForm>
  );
};

export default EditProfileModal;
