import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export function Register({ handleRegister }) {
    const [data, setData] = useState({
        email: "",
        password: "",
    });

    //Обработчик полей ввода имейла и пароля
    function handleChange(e) {
        e.preventDefault();
        const {name, value} = e.target;
        setData({
          [name]: value 
        });
    }

    //Обработчик формы регистрации аккаунта
    function handleSubmit() {
        const { email, password } = data;
        handleRegister(email, password);
    }

    return (
        <Register>
            <div className="register">

            </div>
        </Register>
    )
}

// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import PropTypes from "prop-types";

// function Register({ handleRegister }) {
//   const [data, setData] = useState({
//     email: "",
//     password: "",
//   });

//   const handleChange = (e) => {
//     setData({
//       ...data,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     handleRegister(data.email, data.password);
//   };

//   return (
//     <div className="auth">
//       <form
//         className="form form_theme_dark"
//         name="signup"
//         action="#"
//         noValidate
//         onSubmit={handleSubmit}
//       >
//         <h2 className="form__title form__title_theme_dark">Регистрация</h2>

//         <input
//           className="form__input form__input_theme_dark"
//           type="email"
//           name="email"
//           placeholder="Email"
//           required
//           value={data.email}
//           onChange={handleChange}
//         />

//         <input
//           className="form__input form__input_theme_dark"
//           type="password"
//           name="password"
//           placeholder="Пароль"
//           required
//           value={data.password}
//           onChange={handleChange}
//         />

//         <button
//           className="form__submit-button form__submit-button_theme_dark"
//           type="submit"
//         >
//           Зарегистрироваться
//         </button>
//       </form>
//       <Link to="/sign-in" className="auth__link">
//         Уже зарегистрированы? Войти
//       </Link>
//     </div>
//   );
// }

// Register.propTypes = {
//   handleRegister: PropTypes.func.isRequired,
// };

// export default Register;
//////////////////////

// import React, { useState } from 'react';
// import { Link } from "react-router-dom";

// const Register =  ({ handleRegister, isDataSet }) => {

//   const [data, setData] = useState({
//     email: "",
//     password: "",
//     message: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setData({
//       ...data,
//       [name]: value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const { email, password } = data;
//     handleRegister(password, email);

//     if (isDataSet) {
//       setData({ email: "", password: "" });
//     }
//   };

//   return (
//     <div className="register">
//       <h2 className="register__header">Регистрация</h2>

//       <form onSubmit={handleSubmit} className="register__form">
//         <input
//           className="register__form-input"
//           id="email"
//           name="email"
//           type="email"
//           value={data.email || ''}
//           onChange={handleChange}
//           placeholder="E-mail"
//         />

//         <input
//           className="register__form-input"
//           id="password"
//           name="password"
//           type="password"
//           value={data.password || ''}
//           onChange={handleChange}
//           placeholder="Пароль"
//         />

//         <button type="submit" className="register__form-submit-btn">Зарегистрироваться</button>
//       </form>

//       <p className="register__footer">
//         Уже зарегистрированы?&nbsp;
//         <Link to="sign-in" className="register__login-link">Войти</Link>
//       </p>
//     </div>
//   )
// }

// export default Register;
