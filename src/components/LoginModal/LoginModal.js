import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const LoginModal = ({ isOpen, onCloseModal, handleAuthorization, handleToggleModal }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  useEffect(() => {
    setEmail("");
    setPassword("");
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAuthorization(email, password)
    .then(() => {
      history.push('/profie');
    })
    .catch((e) => {
      console.log(e);
    })
  }

  return (
    <ModalWithForm
      isOpen={isOpen}
      type="login"
      title="Log in"
      buttonText="Log in"
      onCloseModal={onCloseModal}
      onSubmit={handleSubmit}
    >
      <h4 className="form__label">Email</h4>
      <input
        className="form__input"
        name="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <h4 className="form__label">Password</h4>
      <input
        className="form__input"
        name="password"
        type="text"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <p className="modal__form-btn_alt" onClick={handleToggleModal} >or Register</p>
    </ModalWithForm>
  );
};

export default LoginModal;
