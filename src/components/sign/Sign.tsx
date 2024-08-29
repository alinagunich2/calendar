import { ChangeEvent, useState } from "react";
import "./Sign.css";
import { useNavigate } from "react-router-dom";
import { StorageType } from "../../types/enum";
import Button from "../../elements/buttons/Button";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/userState";
import { LocalStorage, UserState } from "../../utils/LocalStorage";

export interface NotiesType {
  day: number;
  month: number;
  year: number;
  title: string;
  description: string;
}
export interface userTypes {
  username: string;
  email: string;
  password: string;
  listNoties?: NotiesType[] | [];
}
const Sign = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
  const listUsers: string | null | undefined = LocalStorage(
    "getItem",
    StorageType.ListUsers
  );
  let parsedUsers: userTypes[] | null = null;
  if (listUsers) {
    parsedUsers = JSON.parse(listUsers);
  }

  const heandelSign = () => {
    setActiveSignUp(!activeSignUp);
    setData({ username: "", email: "", password: "" });
    setError({
      username: "",
      email: "",
      password: "",
    });
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
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
    let findEmail: userTypes | undefined;
    let passwordTrue: boolean | null = null;

    if (parsedUsers) {
      findEmail = parsedUsers.find((item) => item.email === data.email);
      if (!activeSignUp && !newError.email && findEmail) {
        if (data.password !== findEmail.password) {
          passwordTrue = true;
        }
      }
    }

    if (activeSignUp) {
      if (data.username === "") {
        newError.username = "Заполните username";
      } else {
        newError.username = "";
      }
    }

    if (data.email === "") {
      newError.email = "Заполните email";
    } else if (!validateEmail(data.email)) {
      newError.email = "Введите корректный email";
    } else if (findEmail && activeSignUp) {
      newError.email = "Такой пользователь уже есть";
    } else if (!findEmail && !activeSignUp) {
      newError.email = "Такого пользователя нет";
    } else {
      newError.email = "";
    }

    if (data.password === "") {
      newError.password = "Заполните password";
    } else if (activeSignUp && !validatePassword(data.password)) {
      newError.password = "Мин 1 цифр 1 букв и 1 загл букв";
    } else if (!activeSignUp && passwordTrue) {
      newError.password = "Пароль не верен";
    } else {
      newError.password = "";
    }
    setError(() => newError);
    if (
      newError.username !== "" ||
      newError.email !== "" ||
      newError.password !== ""
    ) {
      console.log("error");
    } else {
      if (listUsers === null) {
        LocalStorage("setItem", StorageType.ListUsers, [
          {
            ...data,
            listNoties: [],
          },
        ]);
        LocalStorage("setItem", StorageType.ActiveUser, {
          ...data,
          listNoties: [],
        });
      } else {
        console.log("elsef");
        if (parsedUsers) {
          console.log(parsedUsers, "f");
          console.log(data, "data");
          parsedUsers.push(data);
          LocalStorage("setItem", StorageType.ListUsers, parsedUsers);
          console.log(findEmail);
          if (findEmail) {
            LocalStorage("setItem", StorageType.ActiveUser, findEmail);
          } else {
            LocalStorage("setItem", StorageType.ActiveUser, {
              ...data,
              listNoties: [],
            });
          }
        }
      }
      const getActiveUser = (): UserState => {
        const activeUser = LocalStorage("getItem", StorageType.ActiveUser);
        return activeUser
          ? JSON.parse(activeUser)
          : {
              username: null,
              email: null,
              password: null,
              listNoties: [],
            };
      };

      dispatch(setUser(getActiveUser()));

      navigate("/home");
    }
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
                className="sign__input"
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
            className="sign__input"
            type="email"
            name="email"
            onChange={handleChange}
            value={data.email}
            placeholder="Email..."
          />
          <div className="error">{error.email}</div>
          <input
            className="sign__input"
            type="password"
            name="password"
            onChange={handleChange}
            value={data.password}
            placeholder="Password..."
          />
          <div className="error">{error.password}</div>
          <Button click={submitData} />
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
