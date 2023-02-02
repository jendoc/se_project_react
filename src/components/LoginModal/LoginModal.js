import React, { useEffect, useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const LoginModal = ({ isOpen, onCloseModal }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    setEmail("");
    setPassword("");
  }, [isOpen]);

  return (
    <ModalWithForm
      isOpen={isOpen}
      type="login"
      title="Log in"
      buttonText="Log in"
      onCloseModal={onCloseModal}
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
    </ModalWithForm>
  );
};

export default LoginModal;
