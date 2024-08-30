import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "./Popup.css";

interface PopupProps {
  isVisible: boolean;
  onClose: () => void;
  icon: string;
  text: string;
}

const Popup: React.FC<PopupProps> = ({ isVisible, onClose, icon, text }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.3 }}
          className="popup"
        >
          <div className="popup__container">
            <span className="popup__icon">{icon}</span>
            <div className="popup__text">{text}</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Popup;
