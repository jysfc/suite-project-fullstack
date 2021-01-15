import { combineReducers } from "redux";
import currentUser from "./reducers/currentUser";
import allSuites from "./reducers/allSuites";
import editableSuite from "./reducers/editableSuite";
import editableProperty from "./reducers/editableProperty";
import selectedSuite from "./reducers/selectedSuite";

export default combineReducers({
   currentUser,
   allSuites,
   editableSuite,
   editableProperty,
   selectedSuite,
});
