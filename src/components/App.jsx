// import logo from "./logo.svg";
// import './App.css';
import React, { useState, useEffect } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import "../index.css";
import api from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function App() {
  const [isEditProfilePopupOpen, setisEditProfilePopupOpen] = useState(false);

  const [isAddPlacePopupOpen, setisAddPlacePopupOpen] = useState(false);

  const [isEditAvatarPopupOpen, setisEditAvatarPopupOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState(null);

  const [currentUser, setCurrentUser] = useState({});

  const [cards, setCards] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    Promise.all([api.getUserInfoFromServer(), api.getInitialCards()])
      .then(([userData, initialCards]) => {
        setCurrentUser(userData);
        setCards(initialCards);
      })
      .catch((e) => console.log(`ошибка-Promise.all: ${e}`));
  }, []);

  const handleCardLike = React.useCallback((card) => {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .setLike(card._id, !isLiked)
      .then((newCard) => {
        setCards((cards) =>
          cards.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((e) => console.log(`Ошибка: ${e}`));
  }, [selectedCard])

  const handleCardDelete = React.useCallback((card) => {
    setIsLoading(true);
    api
      .deleteCard(card._id)
      .then((_) => {
        setCards((cards) => cards.filter((c) => c._id !== card._id));
        setIsLoading(false);
      })
      .catch((e) => console.log(`Ошибка: ${e}`));
  }, [selectedCard]);

  const handleCardClick = React.useCallback((card) => {
    setSelectedCard(card);
  }, [selectedCard]);

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

  function handleupdateUser({ name, about }) {
    setIsLoading(true);
    api
      .setUserInfo({ name, about })
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        closeAllPopups();
        setIsLoading(false);
      })
      .catch((e) => console.log(`Ошибка: ${e}`));
  }

  function handleUpdateAvatar({ avatar }) {
    setIsLoading(true);
    api
      .setUserAvatar({ avatar })
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        closeAllPopups();
        setIsLoading(false);
      })
      .catch((e) => console.log(`Ошибка: ${e}`));
  }

  function handleAddPlaceSubmit({ name, link }) {
    setIsLoading(true);
    api
      .postCard({ name, link })
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
        setIsLoading(false);
      })
      .catch((e) => console.log(`Ошибка: ${e}`));
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
          isLoading={isLoading}
        />

        {/* <!-- Попап добавления карточки --> */}
        <AddPlacePopup
          onAddPlace={handleAddPlaceSubmit}
          onClose={closeAllPopups}
          isOpen={isAddPlacePopupOpen}
          isLoading={isLoading}
        />

        {/* <!-- Попап удаления карточки --> */}
        <PopupWithForm
          name="delete-card"
          title="Вы уверены?"
          buttonText={isLoading ? "Удаление..." : "Да"}
          onClose={closeAllPopups}
        ></PopupWithForm>

        {/* <!-- Попап открытия карточки --> */}
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />

        {/* <!-- Попап изменения аватара --> */}
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
        />

        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
