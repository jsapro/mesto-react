import React from "react";

export default function ImagePopup() {
  return (
    <figure className="popup popup_open-card">
      <div className="popup__open-photo">
        <button className="popup__close-btn" type="button"></button>
        <img className="popup__img" src="#" alt="фото" />
        <figcaption className="popup__caption"></figcaption>
      </div>
    </figure>
  );
}
