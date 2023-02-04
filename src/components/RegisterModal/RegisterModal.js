import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const RegisterModal = ({ isOpen, onCloseModal, handleRegistration }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const history = useHistory();

  useEffect(() => {
    setEmail("");
    setPassword("");
    setName("");
    setAvatar("");
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegistration(email, password, name, avatar)
      .then(() => {
        history.push("/profile");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      type="register"
      title="Sign up"
      buttonText="Next"
      onCloseModal={onCloseModal}
      onSubmit={handleSubmit}
    >
      <h4 className="form__label">Email*</h4>
      <input
        className="form__input"
        name="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <h4 className="form__label">Password*</h4>
      <input
        className="form__input"
        name="password"
        type="text"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <h4 className="form__label">Name</h4>
      <input
        className="form__input"
        name="name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <h4 className="form__label">Avatar URL</h4>
      <input
        className="form__input"
        name="avatar"
        type="url"
        value={avatar}
        onChange={(e) => setAvatar(e.target.value)}
        placeholder="Avatar URL"
      />
    </ModalWithForm>
  );
};

export default RegisterModal;
