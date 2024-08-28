import { useNavigate } from "react-router-dom";
import "./Header.css";
import { useDispatch } from "react-redux";
import { deliteUser } from "../../redux/userState";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logout = () => {
    dispatch(deliteUser());
    navigate("/");
  };
  return (
    <header className="header">
      <div className="header__container _container">
        <h1 className="header__title">Calendar Application</h1>
        <button className="header__button" onClick={logout}>
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
