import React from "react";
import { NotiesType } from "../../../utils/LocalStorage";
interface ModalListNotiesTypes {
  isModalListNoties: boolean;
  setModalListNoties: (val: boolean) => void;
  listNoties: NotiesType[];
}
const ModalListNoties: React.FC<ModalListNotiesTypes> = (p) => {
  if (!p.isModalListNoties) return null;
  return <div></div>;
};

export default ModalListNoties;
