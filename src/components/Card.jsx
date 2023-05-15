import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Card({ card, onCardClick, ...props }) {
  const currentUser = useContext(CurrentUserContext);
  // console.log("userContext", useContext(CurrentUserContext));
  console.log(777, currentUser._id);

  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `grid-card__like ${
    isLiked ? "grid-card__like_active" : ""
  }`;

  console.log("isLiked", isLiked);
  console.log("isOwn", isOwn);

  function handleClick() {
    onCardClick(card);
  }
  return (
    <li className="grid-card">
      <div>
        {isOwn && <button className="grid-card__delete" type="button" />}
        <img
          className="grid-card__img"
          src={card.link}
          alt={card.name}
          onClick={handleClick}
        />
      </div>
      <div className="grid-card__caption">
        <h2 className="grid-card__name">{card.name}</h2>
        <div className="grid-card__like-wrapper">
          <button className={cardLikeButtonClassName} type="button"></button>
          <span className="grid-card__like-counter">{card.likes.length}</span>
        </div>
      </div>
    </li>
  );
}
