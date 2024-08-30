import "./Button.css";
interface ButtonType {
  color: string;
  disabled?: boolean;
  click: () => void;
}
const Button: React.FC<ButtonType> = ({
  disabled = false,
  click,
  color,
}: ButtonType) => {
  return (
    <button
      disabled={disabled}
      type="button"
      onClick={click}
      className={`button ${color}`}
    >
      Accept
    </button>
  );
};

export default Button;
