import React from 'react';
import { api } from '../utils/api.js';
import { Header } from './Header.js'
import { Main } from './Main.js'
import { Footer } from './Footer.js'
import { PopupWithForm } from './PopupWithForm.js';
import { ImagePopup } from './ImagePopup.js';
import { EditProfilePopup } from './EditProfilePopup.js';
import { EditAvatarPopup } from './EditAvatarPopup.js';
import { AddPlacePopup } from './AddPlacePopup.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {
  //переменные состояния, отвечающие за видимость попапов изменения данных пользователя, доб-я карточки и изменения аватара
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  //переменные состояния, отвечающие за видимость попапа с картинкой
  const [selectedCard, setSelectedCard] = React.useState(false);
  //переменные состояния, определяющие данные текущего пользователя
  const [currentUser, setCurrentUser] = React.useState({});
  //переменные состояния с пустым массивом карточек, подтягивает данные о карточках через API
  const [cards, setCards] = React.useState([]);

  //передаем массив с данными пользователя и имеющимися карточками методу Promise.all
  React.useEffect(() => {
    Promise.all([api.getPersonalInfo(), api.getInitialCards()])
      .then(([data, card]) => {
        setCurrentUser(data);
        setCards(card);
      })
      .catch((err) => {
        console.log(err);
      });
  },
    []);

  //обработчик формы изменения аватара
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  };

  //обработчик формы с информацией о пользователе
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  };

  //обработчик формы добавления карточки
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  };

  //обработчик попапа с полноразмерной картинкой
  function handleCardClick(card) {
    setSelectedCard(card)
  };

  //обработчик закрытия всех попапов
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(false);
  };

  //функция добавления/удаления лайка
  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    // Отправляем запрос в API и получаем добавление кол-ва лайков
    api.showLikesNumber(card._id, !isLiked).then((newCard) => {
      setCards((cards) => cards.map((c) => c._id === card._id ? newCard : c));
    })
      .catch((err) => {
        console.log(err);
      });
  }

  //функция удаления карточки
  function handleCardDelete(card) {
    api.deleteCard(card._id).then(() => {
      setCards((cards) => cards.filter((c) => c._id !== card._id));
    })
      .catch((err) => {
        console.log(err);
      });
  }

  //функция обновления данных пользователя
  function handleUpdateUser(data) {
    api.showUserInfo(data).then((data) => {
      setCurrentUser(data);
      closeAllPopups();
    })
      .catch((err) => {
        console.log(err);
      });
  }

  //функция изменения аватара
  function handleUpdateAvatar(data) {
    api.editAvatar(data).then((data) => {
      setCurrentUser(data);
      closeAllPopups();
    })
      .catch((err) => {
        console.log(err);
      });
  }

  //функция добаления карточки
  function handleAddPlaceSubmit(data) {
    api.addNewCard(data).then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">

          <Header />

          <Main
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            cards={cards}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />

          <Footer />

          <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />

          <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />

          <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />

          <PopupWithForm onClose={closeAllPopups} title="Вы уверены?" buttonText="Да" name="delete-card" />

          <ImagePopup onClose={closeAllPopups} card={selectedCard} />
        </div>
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;