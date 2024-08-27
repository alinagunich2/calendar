import { useNavigate } from "react-router-dom";
import "./Header.css";
import { StorageType } from "../../types/enum";

const Header = () => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem(StorageType.ActiveUser);
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
