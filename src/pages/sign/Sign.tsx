import "./Sign.css";
import Button from "../../elements/buttons/Button";
import { useSign } from "../../hooks/useSign";

const Sign = () => {
  const { activeSignUp, handleChange, data, error, submitData, heandelSign } =
    useSign();

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
