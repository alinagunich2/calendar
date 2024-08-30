import { useNavigate } from "react-router-dom";
import "./Header.css";
import { useDispatch, useSelector } from "react-redux";
import { deliteUser } from "../../redux/userState";
import { RootState } from "../../redux/store";

const Header = () => {
  const { listNoties } = useSelector((state: RootState) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logout = () => {
    dispatch(deliteUser(listNoties));
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
