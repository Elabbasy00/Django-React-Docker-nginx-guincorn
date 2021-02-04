import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import SignupReducer from "./signup/signup.reducer";

import authReducer from "./login/login.reducer";

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    createUser: SignupReducer,
    auth: authReducer,
  });

export default createRootReducer;
