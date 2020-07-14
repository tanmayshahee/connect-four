import { combineReducers } from "redux";
import game from "./game";
import modalData from "./modalData";
export default combineReducers({
  game,
  modalData,
});
