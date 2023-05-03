import React from "react";
import Card from "./Card";
import api from "../utils/Api";

export default function Main({ onEditProfile, onAddPlace, onEditAvatar }) {
  const [userName, setUserName] = React.useState("");
  const [userDescription, setUserDescription] = React.useState("");
  const [userAvatar, setUserAvatar] = React.useState("");
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    Promise.all([api.getUserInfoFromServer(), api.getInitialCards()])
      .then(([userData, cards]) => {
        // myId = userData._id;
        // setInitialUser(userData);
        // section.renderInitialItems(cards);
        console.log(userData);
        console.log(cards);
        setUserName(userData.name);
        setUserDescription(userData.about);
        setUserAvatar(userData.avatar);
        setCards(cards);
      })
      .catch((err) => console.log("ошибка-Promise.all: ", err));
  }, []);

  return (
    <main>
      <section className="profile" aria-label="редактор профиля">
        <button
          type="button"
          className="profile__avatar-button"
          onClick={onEditAvatar}
        >
          <img
            className="profile__photo"
            src={userAvatar}
            alt="Аватар проофиля"
          />
        </button>
        <div className="profile__user-wrapper">
          <h1 className="profile__name">{userName}</h1>
          <button
            className="profile__edit-button"
            type="button"
            onClick={onEditProfile}
          ></button>
          <p className="profile__job">{userDescription}</p>
        </div>
        <button
          className="profile__add-button"
          type="button"
          onClick={onAddPlace}
        ></button>
      </section>

      <section className="grid-cards" aria-label="фотокарточки">
        <ul className="grid-cards__container">
          {cards.map((card) => (
            <Card card={card} key={card._id} />
          ))}
        </ul>
      </section>
    </main>
  );
}
