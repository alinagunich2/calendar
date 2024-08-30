import "./Popup.css";
import { useEffect } from "react";
import ReactDOM from "react-dom";

interface PortalTypes {
  isVisible: boolean;
  onClose: () => void;
  icon: string;
  text: string;
}

const Popup: React.FC<PortalTypes> = ({ isVisible, onClose, icon, text }) => {
  const portalRoot = document.getElementById("popup-root");

  useEffect(() => {
    if (isVisible) {
      setTimeout(() => {
        onClose();
      }, 2000);
    }
  }, [isVisible, onClose]);

  if (!isVisible || !portalRoot) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className="popup">
      <div className="popup__container">
        <span>{icon}</span>
        <div>{text}</div>
      </div>
    </div>,
    portalRoot
  );
};

export default Popup;
