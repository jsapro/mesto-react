import {useState, useEffect} from "react";
import Card from "./Card";
import api from "../utils/api";

export default function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
}) {
  const [userName, setUserName] = useState("");
  const [userDescription, setUserDescription] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [cards, setCards] = useState([]);

  useEffect(() => {
    Promise.all([api.getUserInfoFromServer(), api.getInitialCards()])
      .then(([userData, cards]) => {
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
            <Card card={card} key={card._id} onCardClick={onCardClick} />
          ))}
        </ul>
      </section>
    </main>
  );
}
