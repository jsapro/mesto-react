// import logo from "./logo.svg";
// import './App.css';
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import "../index.css";

function App() {
  return (
    <div className="page">
      <Header />

      <Main />

      {/* «Редактировать профиль»  <!-- Попап редактирования профиля --> */}
      <PopupWithForm
        name="edit-profile"
        title="Редактировать профиль"
        buttonText="Сохранить"
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
      <PopupWithForm name="add-card" title="Новое место" buttonText="Создать">
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
      <PopupWithForm name="delete-card" title="Вы уверены?" buttonText="Да">
      </PopupWithForm>

      {/* <!-- Попап открытия карточки --> */}
      <figure className="popup popup_open-card">
        <div className="popup__open-photo">
          <button className="popup__close-btn" type="button"></button>
          <img className="popup__img" src="#" alt="фото" />
          <figcaption className="popup__caption"></figcaption>
        </div>
      </figure>

      {/* «Обновить аватар» <!-- Попап изменения аватара --> */}
      <PopupWithForm
        name="avatar-update"
        title="Обновить аватар"
        buttonText="Сохранить"
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
