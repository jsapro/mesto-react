// import logo from "./logo.svg";
// import './App.css';
import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import "../index.css";

function App() {
  const [isEditProfilePopupOpen, setisEditProfilePopupOpen] =
    React.useState(false);

  const [isAddPlacePopupOpen, setisAddPlacePopupOpen] = React.useState(false);

  const [isEditAvatarPopupOpen, setisEditAvatarPopupOpen] =
    React.useState(false);

  const handleEditAvatarClick = () => {
    setisEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setisEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setisAddPlacePopupOpen(true);
  };

  function closeAllPopups() {
    setisEditAvatarPopupOpen(false);
    setisEditProfilePopupOpen(false);
    setisAddPlacePopupOpen(false);
  }

  return (
    <div className="page">
      <Header />

      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
      />

      {/* «Редактировать профиль»  <!-- Попап редактирования профиля --> */}
      <PopupWithForm
        name="edit-profile"
        title="Редактировать профиль"
        buttonText="Сохранить"
        isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}
      >
        <input
          id="name-input"
          className="popup__input popup__input_type_name"
          type="text"
          placeholder="Имя"
          name="nickname"
          minLength="2"
          maxLength="40"
          required
        />
        {/* <!-- Если написать name="name", то вылетает ошибка --> */}

        <span className="popup__input-error name-input-error"></span>

        <input
          id="job-input"
          className="popup__input popup__input_type_job"
          type="text"
          placeholder="Работа"
          name="job"
          minLength="2"
          maxLength="200"
          required
        />

        <span className="popup__input-error job-input-error"></span>
      </PopupWithForm>

      {/* «Новое место» <!-- Попап добавления карточки --> */}
      <PopupWithForm name="add-card" title="Новое место" buttonText="Создать" isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}>
        <input
          id="place-input"
          className="popup__input popup__input_type_card-name"
          type="text"
          placeholder="Название"
          name="description"
          minLength="2"
          maxLength="30"
          required
        />

        <span className="popup__input-error place-input-error"></span>

        <input
          id="url-input"
          className="popup__input popup__input_type_card-url"
          type="url"
          placeholder="Ссылка на картинку"
          name="url"
          required
        />

        <span className="popup__input-error url-input-error"></span>
      </PopupWithForm>

      {/* «Вы уверены?» <!-- Попап удаления карточки --> */}
      <PopupWithForm
        name="delete-card"
        title="Вы уверены?"
        buttonText="Да" onClose={closeAllPopups}
      ></PopupWithForm>

      {/* <!-- Попап открытия карточки --> */}
      <ImagePopup />

      {/* «Обновить аватар» <!-- Попап изменения аватара --> */}
      <PopupWithForm
        name="avatar-update"
        title="Обновить аватар"
        buttonText="Сохранить" isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}
      >
        <input
          id="avatar-url-input"
          className="popup__input popup__input_type_avatar-url"
          type="url"
          placeholder="Ссылка на аватар"
          name="avatarUrl"
          required
        />
        <span className="popup__input-error avatar-url-input-error"></span>
      </PopupWithForm>

      {/* <!-- Шаблон карточки --> */}
      <template className="template-card">
        <li className="grid-card">
          <div>
            <button className="grid-card__delete" type="button"></button>
            <img
              className="grid-card__img"
              src="https://picsum.photos/seed/picsum/800/700"
              alt="фотогалерея"
            />
          </div>
          <div className="grid-card__caption">
            <h2 className="grid-card__name"></h2>
            <div className="grid-card__like-wrapper">
              <button className="grid-card__like" type="button"></button>
              <span className="grid-card__like-counter"></span>
            </div>
          </div>
        </li>
      </template>

      <Footer />
    </div>
  );
}

export default App;
