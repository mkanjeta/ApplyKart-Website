import { combineReducers } from "redux";
import AuthReducer from "./authReducer";
import vcardReducer from "./vcardReducer";
import vcardWorkReducer from "./vcardWorkReducer";
import categoryReducer from "./categoryReducer";
import jobBrowseReducer from "./jobBrowseReducer";
import timelineReducer from "./timelineReducer";
import networkReducer from "./networkReducer";
import myProfileReducer from "./myProfileReducer";

const RootReducer = combineReducers({
  AuthReducer,
  vcardReducer,
  vcardWorkReducer,
  categoryReducer,
  jobBrowseReducer,
  timelineReducer,
  networkReducer,
  myProfileReducer
});

export default RootReducer;