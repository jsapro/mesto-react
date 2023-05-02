import React from "react";

export default function Main() {
  const handleEditAvatarClick = () => {
    document
      .querySelector(".popup_avatar-update")
      .classList.add("popup_opened");
  };

  const handleEditProfileClick = () => {
    document.querySelector(".popup_edit-profile").classList.add("popup_opened");
  };

  const handleAddPlaceClick = () => {
    document.querySelector(".popup_add-card").classList.add("popup_opened");
  };

  return (
    <main>
      <section className="profile" aria-label="редактор профиля">
        <button
          type="button"
          className="profile__avatar-button"
          onClick={handleEditAvatarClick}
        >
          <img className="profile__photo" src="#" alt="Аватар проофиля" />
        </button>
        <div className="profile__user-wrapper">
          <h1 className="profile__name">Жак-Ив Кусто</h1>
          <button
            className="profile__edit-button"
            type="button"
            onClick={handleEditProfileClick}
          ></button>
          <p className="profile__job">Исследователь океана</p>
        </div>
        <button
          className="profile__add-button"
          type="button"
          onClick={handleAddPlaceClick}
        ></button>
      </section>

      <section className="grid-cards" aria-label="фотокарточки">
        <ul className="grid-cards__container"></ul>
      </section>
    </main>
  );
}
