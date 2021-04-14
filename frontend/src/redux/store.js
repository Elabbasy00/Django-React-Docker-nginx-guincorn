import React from "react";

import { Provider } from "react-redux";

import { createBrowserHistory } from "history";

import { routerMiddleware, ConnectedRouter } from "connected-react-router";

import { isEmpty } from "../utiles/Utils";

import logger from "redux-logger";

import { configureStore } from "@reduxjs/toolkit";

import rootReducer from "./root-reducer";

import { authSuccess, setCurrentUser } from "./login/loginSlice";

const Root = ({ children }) => {
  const history = createBrowserHistory();
  const middleware = [routerMiddleware(history), logger];

  const store = configureStore({
    reducer: rootReducer(history),
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(middleware),
  });

  if (!isEmpty(localStorage.getItem("token"))) {
    store.dispatch(authSuccess(localStorage.getItem("token")));
  }
  if (!isEmpty(localStorage.getItem("user"))) {
    const user = JSON.parse(localStorage.getItem("user"));
    store.dispatch(setCurrentUser({ user, redirectTo: "" }));
  }

  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>{children}</ConnectedRouter>
    </Provider>
  );
};

export default Root;
