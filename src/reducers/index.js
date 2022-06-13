import { combineReducers } from "redux";

import taskManger from "./taskManager"
import taskReducer from "./taskReducer"

export default combineReducers({
    taskManger,
    taskReducer
})
