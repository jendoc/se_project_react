import React, { useEffect, useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const EditProfileModal = ({
  isOpen,
  onCloseModal,
  currentUser,
  handleProfileUpdate,
  isLoading,
}) => {
  useEffect(() => {
    setName(currentUser.name);
    setAvatar(currentUser.avatar);
  }, [isOpen]);
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  const handleSubmit = (e) => {
    handleProfileUpdate({
      name,
      avatar,
      token: localStorage.getItem("token"),
    })
      .then(() => {
        onCloseModal();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleNameInput = (e) => {
    setName(e.target.value);
  };

  const handleAvatarInput = (e) => {
    setAvatar(e.target.value);
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      type="update"
      title="Change profile data"
      buttonText={isLoading ? "Saving..." : "Save changes"}
      onCloseModal={onCloseModal}
      onSubmit={handleSubmit}
    >
      <h4>Name*</h4>
      <input
        className="form__input"
        name="name"
        type="name"
        value={name}
        onChange={handleNameInput}
        placeholder="Name"
      ></input>
      <h4>Avatar*</h4>
      <input
        className="form__input"
        name="avatar"
        type="url"
        value={avatar}
        onChange={handleAvatarInput}
        placeholder="Avatar URL"
      ></input>
    </ModalWithForm>
  );
};

export default EditProfileModal;
