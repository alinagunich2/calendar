import "./Header.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deliteUser } from "../../redux/userState";
import { RootState } from "../../redux/store";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { listNoties, email, color } = useSelector((state: RootState) => ({
    listNoties: state.user.listNoties,
    email: state.user.email,
    color: state.calendar.color,
  }));

  const logout = () => {
    dispatch(deliteUser(listNoties));
    navigate("/");
  };
  return (
    <header className={`header ${color}`}>
      <div className="header__container _container">
        <h1 className="header__title">Calendar Application</h1>
        <div className="header__data">
          <div className="">&#129418; {email}</div>
          <button className="header__button" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
