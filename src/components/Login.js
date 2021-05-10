import React, { useState } from 'react';

export function Login({ handleLogin }) {
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

    //Обработчик формы входа в аккаунт
    function handleSubmit() {
        const { email, password } = data;
        handleLogin(email, password);
    }

    return (
        <Login>
            <div className="auth">

            </div>
        </Login>
    )
}


// import React, { useState } from "react";
// import PropTypes from "prop-types";

// function Login({ handleLogin }) {
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
//     handleLogin(data.email, data.password);
//   };

//   return (
//     <div className="auth">
//       <form
//         className="form form_theme_dark"
//         name="login"
//         action="#"
//         noValidate
//         onSubmit={handleSubmit}
//       >
//         <h2 className="form__title form__title_theme_dark">Вход</h2>

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
//           Войти
//         </button>
//       </form>
//     </div>
//   );
// }

// Login.propTypes = {
//   handleLogin: PropTypes.func.isRequired,
// };

// export default Login;
////////////////////////
// import React, { useState } from 'react';

// const Login = ({ handleLogin }) => {

//   const [data, setData] = useState({
//     email: "",
//     password: "",
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
//     handleLogin(email, password);
//   };

//   return (
//     <div onSubmit={handleSubmit} className="login">

//       <h2 className="login__header">Вход</h2>

//       <form className="login__form">
//         <input
//           className="login__form-input"
//           id="email"
//           required
//           name="email"
//           type="email"
//           value={data.email || ''}
//           onChange={handleChange}
//           placeholder="E-mail"
//         />

//         <input
//           className="login__form-input"
//           id="password"
//           required
//           name="password"
//           type="password"
//           value={data.password || ''}
//           onChange={handleChange}
//           placeholder="Пароль"
//         />

//         <button type="submit" className="login__form-submit-btn">Войти</button>
//       </form>
//     </div>
//   )
// }

// export default Login;