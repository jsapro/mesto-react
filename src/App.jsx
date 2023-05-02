import logo from "./logo.svg";
// import './App.css';
import './index.css';

function App() {
  return (
    <div className="body">
      <div className="page">
        <header className="header">
          <img
            className="header__logo"
            src="<%=require('./images/header-logo.svg')%>"
            alt="лого Mesto"
          />
        </header>

        <main>
          <section className="profile" aria-label="редактор профиля">
            <button type="button" className="profile__avatar-button">
              <img className="profile__photo" src="#" alt="Аватар проофиля" />
            </button>
            <div className="profile__user-wrapper">
              <h1 className="profile__name">Жак-Ив Кусто</h1>
              <button className="profile__edit-button" type="button"></button>
              <p className="profile__job">Исследователь океана</p>
            </div>
            <button className="profile__add-button" type="button"></button>
          </section>

          <section className="grid-cards" aria-label="фотокарточки">
            <ul className="grid-cards__container"></ul>
          </section>
        </main>

        {/* <!-- Попап редактирования профиля --> */}
        <section className="popup popup_edit-profile">
          <div className="popup__container">
            <button className="popup__close-btn" type="button"></button>
            <h2 className="popup__header">Редактировать профиль</h2>
            <form
              className="popup__form"
              id="login-form"
              name="profile-form"
              noValidate
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
              <button
                className="popup__submit"
                type="submit"
                form="login-form"
                disabled
              >
                Сохранить
              </button>
            </form>
          </div>
        </section>

        {/* <!-- Попап добавления карточки --> */}
        <section className="popup popup_add-card">
          <div className="popup__container">
            <button className="popup__close-btn" type="button"></button>
            <h2 className="popup__header">Новое место</h2>
            <form
              className="popup__form"
              id="add-card-form"
              name="card-form"
              noValidate
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
              <button
                className="popup__submit"
                type="submit"
                form="add-card-form"
                disabled
              >
                Создать
              </button>
            </form>
          </div>
        </section>

        {/* <!-- Попап удаления карточки --> */}
        <section className="popup popup_delete-card">
          <div className="popup__container">
            <button className="popup__close-btn" type="button"></button>
            <h2 className="popup__header popup__header_confirm">Вы уверены?</h2>
            <button type="submit" className="popup__submit">
              Да
            </button>
          </div>
        </section>

        {/* <!-- Попап открытия карточки --> */}
        <figure className="popup popup_open-card">
          <div className="popup__open-photo">
            <button className="popup__close-btn" type="button"></button>
            <img className="popup__img" src="#" alt="фото" />
            <figcaption className="popup__caption"></figcaption>
          </div>
        </figure>

        {/* <!-- Попап изменения аватара --> */}
        <section className="popup popup_avatar-update">
          <div className="popup__container">
            <button className="popup__close-btn" type="button"></button>
            <h2 className="popup__header">Обновить аватар</h2>
            <form
              className="popup__form"
              id="avatar-form"
              name="avatar-update-form"
              noValidate
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
              <button
                className="popup__submit"
                type="submit"
                form="avatar-form"
                disabled
              >
                Сохранить
              </button>
            </form>
          </div>
        </section>

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

        <footer className="footer">
          <p className="footer__copyright">© 2023 Mesto Russia</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
