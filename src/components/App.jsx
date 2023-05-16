// import logo from "./logo.svg";
// import './App.css';
import React, { useState, useEffect } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import "../index.css";
import api from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

// console.dir(CurrentUserContext.Provider)

// const name = "6541ertg";
// const url = "https://www.interfax.ru/ftproot/photos/photostory/2020/08/07/week1_700.jpg";

// api.postCard({ description: name, url: url});

function App() {
  const [isEditProfilePopupOpen, setisEditProfilePopupOpen] = useState(false);

  const [isAddPlacePopupOpen, setisAddPlacePopupOpen] = useState(false);

  const [isEditAvatarPopupOpen, setisEditAvatarPopupOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState(null);

  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    api.getUserInfoFromServer().then((user) => setCurrentUser(user));
  }, []);

  const [cards, setCards] = useState([]);

  useEffect(() => {
    api
      .getInitialCards()
      .then((cards) => {
        // console.log(userData);
        // console.log(cards);
        setCards(cards);
      })
      .catch((err) => console.log("ошибка-Promise.all: ", err));
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api.setLike(card._id, !isLiked).then((newCard) => {
      setCards((cards) => cards.map((c) => (c._id === card._id ? newCard : c)));
    });
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id).then((_) => {
      setCards((cards) => cards.filter((c) => c._id !== card._id));
    });
  }

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

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
    setSelectedCard(null);
  }

  function handleupdateUser({name, about}) {
    api.setUserInfo({name, about}).then((updatedUser) => {
      setCurrentUser(updatedUser);
    }).catch(e => console.log(e))
    closeAllPopups();
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />

        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          cards={cards}
        />

        {/*<!-- Попап редактирования профиля --> */}
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleupdateUser}
        />

        {/* <!-- Попап добавления карточки --> */}
        <PopupWithForm
          name="add-card"
          title="Новое место"
          buttonText="Создать"
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
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

        {/* <!-- Попап удаления карточки --> */}
        <PopupWithForm
          name="delete-card"
          title="Вы уверены?"
          buttonText="Да"
          onClose={closeAllPopups}
        ></PopupWithForm>

        {/* <!-- Попап открытия карточки --> */}
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />

        {/* <!-- Попап изменения аватара --> */}
        <PopupWithForm
          name="avatar-update"
          title="Обновить аватар"
          // buttonText="Сохранить"
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
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

        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
