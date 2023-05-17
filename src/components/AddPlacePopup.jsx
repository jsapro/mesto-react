import React, { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup({ onAddPlace, onClose, isOpen }) {
  const [place, setPlace] = useState("");
  const [url, setUrl] = useState("");

  function handlePlaceChange(e) {
    setPlace(e.target.value);
  }
  function handleUrlChange(e) {
    setUrl(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name: place,
      link: url,
    });
      setPlace("");
      setUrl("");
  }

  return (
    <PopupWithForm
      name="add-card"
      title="Новое место"
      buttonText="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        id="place-input"
        className="popup__input popup__input_type_card-name"
        type="text"
        placeholder="Название"
        name="description"
        minLength="2"
        maxLength="30"
        required
        value={place ?? ""}
        onChange={handlePlaceChange}
      />

      <span className="popup__input-error place-input-error"></span>

      <input
        id="url-input"
        className="popup__input popup__input_type_card-url"
        type="url"
        placeholder="Ссылка на картинку"
        name="url"
        required
        value={url ?? ""}
        onChange={handleUrlChange}
      />

      <span className="popup__input-error url-input-error"></span>
    </PopupWithForm>
  );
}
