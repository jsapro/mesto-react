import React from "react";

export default function PopupWithForm({ name, title, children, buttonText }) {
  return (
    <section className={`popup popup_${name}`}>
      <div className="popup__container">
        <h2 className="popup__header">{title}</h2>
        <form className="popup__form" name={name} noValidate>
          {children}
          <button
            className="popup__submit"
            type="submit"
            // form="login-form"
            disabled
          >
            {buttonText}
          </button>
        </form>
        <button className="popup__close-btn" type="button"></button>
      </div>
    </section>
  );
}
