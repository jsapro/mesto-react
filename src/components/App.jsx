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
import PopupWithSubmit from "./PopupWithSubmit";

function App() {
  const [selectedCard, setSelectedCard] = useState(null);

  const [currentUser, setCurrentUser] = useState({});

  const [cards, setCards] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);

  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);

  const [isSubmitPopupOpen, setIsSubmitPopupOpen] = useState(false);

  const [cardIdToDelete, setCardIdToDelete] = useState("");

  // Обновление всех карточек:
  // - при клике на любое фото
  // - при смене аватара
  // - при смене юзера
  // Добавить ещё useCallback???
  //------------------------------
  // Нет обновления всех карточек:
  // - при лайке
  // - при удалении карточки
  // - при добавлении карточки

  useEffect(() => {
    Promise.all([api.getUserInfoFromServer(), api.getInitialCards()])
      .then(([userData, initialCards]) => {
        setCurrentUser(userData);
        setCards(initialCards);
      })
      .catch((e) => console.log(`ошибка-Promise.all: ${e}`));
  }, []);

  const handleCardLike = React.useCallback(
    (card, isLiked) => {
      // const isLiked = card.likes.some((i) => i._id === currentUser._id);
      api
        .changeLikeCardStatus(card._id, isLiked)
        .then((newCard) => {
          setCards((cards) =>
            cards.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((e) => console.log(`Ошибка: ${e}`));
    },
    [selectedCard]
  );

  const handleCardDelete = React.useCallback(
    (card) => {
      setCardIdToDelete(card._id);
      setIsSubmitPopupOpen(true);
    },
    [selectedCard]
  );

  const handleCardDeleteApprove = React.useCallback(
    (cardIdToDelete) => {
      setIsLoading(true);
      api
        .deleteCard(cardIdToDelete)
        .then((_) => {
          setCards((cards) => cards.filter((c) => c._id !== cardIdToDelete));
          setIsLoading(false);
          setIsSubmitPopupOpen(false);
        })
        .catch((e) => console.log(`Ошибка: ${e}`));
    },
    [selectedCard]
  );

  const handleCardClick = React.useCallback(
    (card) => {
      setSelectedCard(card);
    },
    [selectedCard]
  );

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsSubmitPopupOpen(false);
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
        <PopupWithSubmit
          onClose={closeAllPopups}
          isLoading={isLoading}
          isOpen={isSubmitPopupOpen}
          onSubmit={handleCardDeleteApprove}
          cardIdToDelete={cardIdToDelete}
        />

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
