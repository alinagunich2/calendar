import React from "react";
interface ButtonType {
  click: () => void;
}
const Button: React.FC<ButtonType> = (p) => {
  return (
    <button type="button" onClick={p.click} className="sign__button">
      Accept
    </button>
  );
};

export default Button;
