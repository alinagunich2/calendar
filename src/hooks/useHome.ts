import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { RootState } from "../redux/store";
import { LocalStorage } from "../utils/LocalStorage";

export const useHome = () => {
  const { email } = useSelector((state: RootState) => state.user);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const isPopupShown = LocalStorage("getItem", "popupShown");
    if (!isPopupShown && email) {
      setShowPopup(true);
      LocalStorage("setItem", "popupShown", "true");
    }
  }, [email]);

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return {
    showPopup,
    handleClosePopup,
  };
};
