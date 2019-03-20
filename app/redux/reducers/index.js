import { combineReducers } from "redux";

import user from "./userReducer";
import task from "./taskReducer";

export default combineReducers({
    user,
    task
});