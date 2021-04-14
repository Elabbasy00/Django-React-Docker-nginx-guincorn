import { combineReducers } from "redux";

import { connectRouter } from "connected-react-router";

import LoginReducer from "./login/loginSlice";

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    auth: LoginReducer,
  });

export default createRootReducer;
