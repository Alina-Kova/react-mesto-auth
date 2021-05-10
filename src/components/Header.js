import logo from '../images/header-logo.svg';
import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';


export function Header({ email, handleLogout }) {
    return (
        <header className="header">
            <img src={logo} alt="логотип Место" className="header__logo" />
            <Switch>
                <Route path="/sign-up">
                    <Link to="/sign-шт" className="header__button">Регистрация</Link>
                </Route>
                <Route path="sign-in">
                    <Link to="/sign-up" className="header__button">Войти</Link>
                </Route>
                <Route path="/">
                    <div className="header__container">
                    {/* <p className="header__email">{email}</p> */}
                    <p className="header__email">lovering2007@mail.ru</p>
                    <Link to="/sign-in" className="header__logout-button" onClick="handleLogout">Выйти</Link>
                    </div>
                </Route>
            </Switch>
        </header>
    )
}

export default Header;


// import React, { useState } from "react";
// import cn from "classnames";
// import PropTypes from "prop-types";
// import { Switch, Route, Link } from "react-router-dom";
// import logo from "../images/logo_color_white.svg";

// function Header({ userAuthData, handleLogout }) {
//   const [isMenuButtonPressed, setIsMenuButtonPressed] = useState(false);

//   const handleMenuClick = () => {
//     setIsMenuButtonPressed(!isMenuButtonPressed);
//   };

//   return (
//     <header className="header page__header">
//       <div className="header__container">
//         <img className="header__logo" src={logo} alt="Логотип Mesto" />

//         <Switch>
//           <Route path="/sign-up">
//             <Link to="/sign-in" className="header__link">
//               Войти
//             </Link>
//           </Route>
//           <Route path="/sign-in">
//             <Link to="/sign-up" className="header__link">
//               Регистрация
//             </Link>
//           </Route>
//           <Route exact path="/">
//             <div
//               className={cn("header__logout-container", {
//                 "header__logout-container_visible": isMenuButtonPressed,
//               })}
//             >
//               <p className="header__user-info">{userAuthData.email}</p>
//               <button
//                 type="button"
//                 className="logout-button"
//                 onClick={handleLogout}
//               >
//                 Выйти
//               </button>
//             </div>
//             <button
//               className={cn("header__menu-button", {
//                 "header__menu-button_icon_hamburger": !isMenuButtonPressed,
//                 "header__menu-button_icon_close": isMenuButtonPressed,
//               })}
//               type="button"
//               onClick={handleMenuClick}
//             ></button>
//           </Route>
//         </Switch>
//       </div>
//     </header>
//   );
// }

// Header.propTypes = {
//   userAuthData: PropTypes.object.isRequired,
//   handleLogout: PropTypes.func.isRequired,
// };

// export default Header;
////////////////////////////////
// import React from 'react';
// import { Route, Switch, Link } from 'react-router-dom';

// const Header = ({ handleLogout, email }) => (
//   <header className="header page__header">
//     <div className="header__logo" />
//     <Switch>
//       <Route exact path="/">
//         <div className="header__wrapper">
//           <p className="header__email">{email}</p>
//           <Link
//             to="/sign-in"
//             onClick={handleLogout}
//             className="header__link"
//           >Выйти</Link>
//         </div>
//       </Route>

//       <Route path="/sign-in">
//         <Link to="/sign-up" className="header__link">Зарегистрироваться</Link>
//       </Route>

//       <Route path="/sign-up">
//         <Link to="/sign-in" className="header__link">Войти</Link>
//       </Route>
//     </Switch>
//   </header>
// );

// export default Header;
