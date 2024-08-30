import { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { StorageType } from "../types/enum";
import { LocalStorage, UserState } from "../utils/LocalStorage";
import { setUser } from "../redux/userState";

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

export const useSign = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
  const parsedUsers: userTypes[] = listUsers ? JSON.parse(listUsers) : [];

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

  const validateForm = () => {
    const newError = { ...error };
    const existingUser = parsedUsers.find((user) => user.email === data.email);

    if (activeSignUp) {
      newError.username = data.username ? "" : "Заполните username";
    }

    newError.email = data.email
      ? validateEmail(data.email)
        ? existingUser && activeSignUp
          ? "Такой пользователь уже есть"
          : !existingUser && !activeSignUp
          ? "Такого пользователя нет"
          : ""
        : "Введите корректный email"
      : "Заполните email";

    newError.password = data.password
      ? activeSignUp
        ? validatePassword(data.password)
          ? ""
          : "Мин 1 цифр 1 букв и 1 загл букв"
        : existingUser?.password !== data.password
        ? "Пароль не верен"
        : ""
      : "Заполните password";

    setError(newError);
    return !Object.values(newError).some((errorMessage) => errorMessage !== "");
  };

  const submitData = () => {
    if (validateForm()) {
      if (!listUsers) {
        LocalStorage("setItem", StorageType.ListUsers, [
          { ...data, listNoties: [] },
        ]);
      } else {
        parsedUsers.push(data);
        LocalStorage("setItem", StorageType.ListUsers, parsedUsers);
      }
      LocalStorage("setItem", StorageType.ActiveUser, data);

      dispatch(setUser(data as UserState));
      navigate("/home");
    } else {
      console.log("error");
    }
  };

  return {
    activeSignUp,
    handleChange,
    data,
    error,
    submitData,
    heandelSign,
  };
};
