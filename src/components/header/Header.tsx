import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="header__container _container">
        <h1 className="header__title">Calendar Application</h1>
        <button className="header__button">Logout</button>
      </div>
    </header>
  );
};

export default Header;
