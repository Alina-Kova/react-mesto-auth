import React from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
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
import { ProtectedRoute } from './ProtectedRoute.js';
import { InfoTooltip } from './InfoTooltip.js';
import { Login } from './Login.js';
import { Register } from './Register.js';

function App() {
  //переменные состояния, отвечающие за видимость попапов изменения данных пользователя, доб-я карточки и изменения аватара
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  //переменные состояния, отвечающие за видимость модального окна с инфой об успешной или нет регистрации
  const [isInfoToolTipOpen, setisInfoToolTipOpen ] = React.useState(false);
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

// import React, { useState, useEffect } from 'react';
// import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
// import ProtectedRoute from './ProtectedRoute';

// import api from '../utils/api';
// import * as auth from '../utils/auth';
// import { CurrentUserContext } from '../contexts/CurrentUserContext';

// import Header from './Header';
// import Main from './Main';
// import Footer from './Footer';
// import ImageModal from './ImageModal';
// import EditProfileModal from './EditProfileModal';
// import EditAvatarModal from './EditAvatarModal';
// import AddPlaceModal from './AddPlaceModal';
// import Login from './Login';
// import Register from './Register';
// import InfoToolTip from './InfoTooltip';

// function App() {
//   const [isEditAvatarModalOpen, setIsEditAvatarModalOpen] = useState(false);
//   const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
//   const [isAddPlaceModalOpen, setIsAddPlaceModalOpen] = useState(false);
//   const [isInfoToolTipOpen, setIsInfoToolTipOpen] = React.useState(false);
//   const [selectedCard, setSelectedCard] = useState({ isImgOpen: false });
//   const [currentUser, setCurrentUser] = useState({});
//   const [cards, setCards] = useState([]);
//   const [isDataSet, setIsDataSet] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   const [infoToolTipData, setInfoToolTipData] = useState({
//     title: "Что-то пошло не так! Попробуйте ещё раз.",
//     icon: false,
//   });

//   const [userData, setUserData] = useState({
//     email: "",
//   });

//   const [loggedIn, setLoggedIn] = useState(false);

//   const history = useHistory();

//   const tokenCheck = () => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       auth
//         .getContent(token)
//         .then((res) => {
//           if (res) {
//             setUserData({ email: res.data.email });
//             setLoggedIn(true);
//           }
//         })
//         .catch((err) => console.error(err));
//     }
//   };

//   React.useEffect(() => {
//     tokenCheck();
//   }, []);

//   React.useEffect(() => {
//     if (loggedIn) {
//       history.push("/");
//     }
//   }, [history, loggedIn]);

//   useEffect(() => {
//     setIsLoading(true);

//     Promise.all([
//       api.getInitialCardList(),
//       api.getUserInfo(),
//     ])
//       .then(([cardsData, userData]) => {
//         const items = cardsData.map((item) => ({
//           _id: item._id,
//           name: item.name,
//           link: item.link,
//           likes: item.likes,
//           owner: item.owner,
//         }));

//         setCurrentUser(userData);
//         setCards(items);
//       })
//       .catch((err) => {
//         console.error(err);
//       })
//       .finally(() => setIsLoading(false));
//   }, []);

//   function handleInfoToolTip() {
//     setIsInfoToolTipOpen(true);
//   }

//   const handleLogin = (email, password) => {
//     auth
//       .authorize(email, password)
//       .then((data) => {
//         if (data.token) {
//           localStorage.setItem("token", data.token);
//           setUserData({email: email});
//           setLoggedIn(true);
//           history.push('/');
//         }
//       })
//       .catch((err) => console.error(err));
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     setUserData({ email: "" });
//     setLoggedIn(false);
//   };


//   const handleRegister = (password, email) => {
//     auth
//       .register(password, email)
//       .then(() => {
//         setIsDataSet(true);
//         history.push("/sign-in");
//         setInfoToolTipData({ icon: true, title: "Вы успешно зарегистрировались!" });
//         handleInfoToolTip();
//       })
//       .catch(() => {
//         setIsDataSet(false);
//         setInfoToolTipData({
//           icon: false,
//           title: "Что-то пошло не так! Попробуйте ещё раз.",
//         });
//         handleInfoToolTip();
//       });
//   };

//   const handleEditAvatarClick = () => {
//     setIsEditAvatarModalOpen(true);
//   };

//   const handleUpdateAvatar = (avatarData) => {
//     api.changeAvatar(avatarData)
//       .then((res) => {
//         setCurrentUser(res);
//         closeAllModals();
//       })
//       .catch((err) => {
//         console.error(err);
//       });
//   };

//   const handleEditProfileClick = () => {
//     setIsEditProfileModalOpen(true);
//   };

//   const handleUpdateUser = (userData) => {
//     api.saveUserInfo(userData)
//       .then((res) => {
//         setCurrentUser(res);
//         closeAllModals();
//       })
//       .catch((err) => {
//         console.error(err);
//       });
//   };

//   const handleAddPlaceClick = () => {
//     setIsAddPlaceModalOpen(true);
//   };

//   const handleAddPlaceSubmit = (newCard) => {
//     api
//       .saveCard(newCard)
//       .then((newCard) => {
//         setCards([newCard, ...cards]);
//         closeAllModals();
//       })
//       .catch((err) => {
//         console.error(err);
//       });
//   };

//   const handleCardClick = (card) => {
//     setSelectedCard({ isImgOpen: true, ...card });
//   };

//   function handleCardDelete(card) {
//     console.log(card);
//     api.deleteCard(card._id)
//       .then(() => {
//         const newCards = cards.filter((item) => item._id !== card._id);
//         setCards(newCards);
//       })
//       .catch((err) => {
//       console.error(err);
//     });
//   }

//   function handleCardLike(card) {
//     const isLiked = card.likes.some((like) => like._id === currentUser._id);

//     api.changeLikeCardStatus(card._id, isLiked)
//       .then((newCard) => {
//         const newCards = cards.map((item) => (item._id === card._id ? newCard : item));
//         setCards(newCards);
//       })
//       .catch((err) => {
//         console.error(err);
//       });
//   }

//   const closeAllModals = () => {
//     setIsEditAvatarModalOpen(false);
//     setIsEditProfileModalOpen(false);
//     setIsAddPlaceModalOpen(false);
//     setSelectedCard({ isImgOpen: false });
//     setIsInfoToolTipOpen(false);
//   };

//   return (
//     <CurrentUserContext.Provider value={currentUser}>
//       <div className="page">
//         <div className="page__container">
//           <Header
//             handleLogout={handleLogout}
//             email={userData.email}/>

//           <Switch>

//             <ProtectedRoute
//               exact
//               path="/"
//               loggedIn={loggedIn}
//               onEditProfile={handleEditProfileClick}
//               onAddPlace={handleAddPlaceClick}
//               onEditAvatar={handleEditAvatarClick}
//               cards={cards}
//               onCardClick={handleCardClick}
//               onCardDelete={handleCardDelete}
//               onCardLike={handleCardLike}
//               onLoading={isLoading}
//               component={Main}
//             />

//             <Route path="/sign-in">
//               <Login handleLogin={handleLogin} />
//             </Route>

//             <Route path="/sign-up">
//               <Register handleRegister={handleRegister} isDataSet={isDataSet} />
//             </Route>

//             <Route>
//               {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
//             </Route>

//           </Switch>
//           <Footer copyright="© 2020 Mesto Russia. Сергей Компаниец" />

//           <EditAvatarModal
//             isOpen={isEditAvatarModalOpen}
//             onClose={closeAllModals}
//             onUpdateAvatar={handleUpdateAvatar}
//           />

//           <EditProfileModal
//             isOpen={isEditProfileModalOpen}
//             onClose={closeAllModals}
//             onUpdateUser={handleUpdateUser}
//           />

//           <AddPlaceModal
//             isOpen={isAddPlaceModalOpen}
//             onClose={closeAllModals}
//             onAddPlace={handleAddPlaceSubmit}
//           />

//           <ImageModal card={selectedCard} onClose={closeAllModals} />

//           <InfoToolTip
//             isOpen={isInfoToolTipOpen}
//             onClose={closeAllModals}
//             title={infoToolTipData.title}
//             icon={infoToolTipData.icon}
//           />
//         </div>
//       </div>
//     </CurrentUserContext.Provider>
//   );
// }

// export default App;