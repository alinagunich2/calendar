import ReactDOM from "react-dom";
import "./Portal.css";

interface PortalTypes {
  title: string;
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Portal: React.FC<PortalTypes> = (p) => {
  const portalRoot = document.getElementById("portal-root");

  if (!p.isVisible || !portalRoot) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className="modal">
      <div className="modal__container">
        <div className="modal__header">
          <h2 className="modal__title">{p.title}</h2>
          <div className="modal__closs" onClick={p.onClose}>
            &#10060;
          </div>
        </div>
        {p.children}
      </div>
    </div>,
    portalRoot
  );
};

export default Portal;
