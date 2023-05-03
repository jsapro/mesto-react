import React from "react";

export default function Card({ card }) {
  return (
    <li className="grid-card">
      <div>
        <button className="grid-card__delete" type="button" />
        <img className="grid-card__img" src={card.link} alt="фотогалерея" />
      </div>
      <div className="grid-card__caption">
        <h2 className="grid-card__name">{card.name}</h2>
        <div className="grid-card__like-wrapper">
          <button className="grid-card__like" type="button"></button>
          <span className="grid-card__like-counter">{card.likes.length}</span>
        </div>
      </div>
    </li>
  );
}
