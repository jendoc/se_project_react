import React, { useEffect, useState, useMemo } from "react";
import { useHistory } from "react-router-dom";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { emailRegex } from "../../utils/constants";

const LoginModal = ({
  isOpen,
  onCloseModal,
  handleLogin,
  handleToggleModal,
  showFormError,
  setShowFormError,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const isValid = useMemo(() => {
    return password.length >= 8 && email.length >= 1 && email.match(emailRegex);
  }, [email, password]);

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(email, password);
    history.push("/profile");
  };

  useEffect(() => {
    setEmail("");
    setPassword("");
    setShowFormError(false);
  }, [isOpen]);

  return (
    <ModalWithForm
      isOpen={isOpen}
      type="login"
      title="Log in"
      buttonText="Log in"
      onCloseModal={onCloseModal}
      onSubmit={handleSubmit}
      disabled={!isValid}
    >
      <h4 className={showFormError ? "form__label_error" : "form__label"}>
        {showFormError ? "Incorrect email or password" : "Email"}
      </h4>
      <input
        className={showFormError ? "form__input_error" : "form__input"}
        name="email"
        type="email"
        value={email}
        onChange={handleEmail}
        placeholder="Email"
        required
      />
      <h4 className={showFormError ? "form__label_error" : "form__label"}>
        {showFormError ? "Incorrect email or password" : "Password"}
      </h4>
      <input
        className={showFormError ? "form__input_error" : "form__input"}
        name="password"
        type="text"
        value={password}
        onChange={handlePassword}
        placeholder="Password"
        required
      />
      <p className="modal__form-btn_alt" onClick={handleToggleModal}>
        or Register
      </p>
    </ModalWithForm>
  );
};

export default LoginModal;
