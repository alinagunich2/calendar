import { ChangeEvent, useEffect, useState } from "react";
import "./Sign.css";

const Sign = () => {
  const [activeSignUp, setActiveSignUp] = useState(true);
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState({
    username: "",
    email: "",
    password: "",
  });

  const heandelSign = () => {
    setActiveSignUp(!activeSignUp);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePassword = (password: string) => {
    return (
      /[0-9]/.test(password) && /[A-Z]/.test(password) && /[a-z]/.test(password)
    );
  };

  const submitData = () => {
    const newError = { ...error };
    if (data.username === "") {
      return (newError.username = "Заполните username");
    } else {
      newError.username = "";
    }

    if (data.email === "") {
      return (newError.password = "Заполните email");
    } else if (!validateEmail(data.email)) {
      return (newError.email = "Введите корректный email");
    } else {
      newError.email = "";
    }

    if (data.password === "") {
      return (newError.password = "Заполните password");
    } else if (!validatePassword(data.password)) {
      return (newError.password = "Мин 1 цифр 1 букв и 1 загл букв");
    } else {
      newError.password = "";
    }
    setError(newError);
    return console.log("отпоавлено");
  };
  return (
    <div className="sign__container ">
      <div className="sign__content">
        <div className="sign__title">
          {activeSignUp ? <>Sign Up</> : <>Sign In</>}
        </div>
        <form className="sign__form">
          {activeSignUp && (
            <>
              <input
                onChange={handleChange}
                name="username"
                type="text"
                value={data.username}
                placeholder="Username..."
              />
              <div className="error">{error.username}</div>
            </>
          )}
          <input
            type="email"
            name="email"
            onChange={handleChange}
            value={data.email}
            placeholder="Email..."
          />
          <div className="error">{error.email}</div>
          <input
            type="text"
            name="password"
            onChange={handleChange}
            value={data.password}
            placeholder="Password..."
          />
          <div className="error">{error.password}</div>
          <button type="button" onClick={submitData} className="sign__button">
            Accept
          </button>
        </form>
      </div>
      <p className="sign__description">
        {activeSignUp ? (
          <>
            Already have an account? Try to{" "}
            <span onClick={heandelSign}>Sign-in!</span>
          </>
        ) : (
          <>
            Don't have an account? Try to{" "}
            <span onClick={heandelSign}>Sign-up!</span>
          </>
        )}
      </p>
    </div>
  );
};

export default Sign;
