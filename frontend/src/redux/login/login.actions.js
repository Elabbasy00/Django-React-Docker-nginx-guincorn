import * as Types from "./login.types";
import axios from "axios";
import { push } from "connected-react-router";
import { toast } from "react-toastify";

import { setAxiosAuthToken, toastOnError } from "../../utiles/Utils";

export const authStart = () => {
  return {
    type: Types.AUTH_START,
  };
};

export const authSuccess = (token) => {
  setAxiosAuthToken(token);
  localStorage.setItem("token", token);
  return {
    type: Types.AUTH_SUCCESS,
    token: token,
  };
};

export const authSetUser = (user) => {
  return {
    type: Types.AUTH_SET_USER,
    user: user,
  };
};

export const authFail = (error) => {
  return {
    type: Types.AUTH_FAIL,
    error: error,
  };
};
export const authLogout = () => {
  return {
    type: Types.AUTH_LOGOUT,
  };
};

export const LoginUser = (userData, redirectTo) => {
  return (dispatch) => {
    dispatch(authStart());
    axios
      .post("/api/v1/token/login/", userData)
      .then((res) => {
        const { auth_token } = res.data;
        setAxiosAuthToken(auth_token);
        dispatch(authSuccess(auth_token));
        dispatch(getCurrentUser(redirectTo));
        toast.success("Login Success");
      })
      .catch((error) => {
        dispatch(unsetCurrentUser());
        toastOnError(error);
      });
  };
};

export const getCurrentUser = (redirectTo) => (dispatch) => {
  axios
    .get("/api/v1/users/me/")
    .then((response) => {
      const user = {
        username: response.data.username,
        email: response.data.email,
      };

      dispatch(setCurrentUser(user, redirectTo));
    })
    .catch((error) => {
      dispatch(Logout());
      toastOnError(error);
    });
};

export const setCurrentUser = (user, redirectTo) => (dispatch) => {
  localStorage.setItem("user", JSON.stringify(user));
  dispatch(authSetUser(user));

  if (redirectTo !== "") {
    dispatch(push(redirectTo));
  }
};

export const unsetCurrentUser = () => (dispatch) => {
  setAxiosAuthToken("");
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  dispatch(authLogout());
};

export const Logout = () => (dispatch) => {
  axios
    .post("/api/v1/token/logout/")
    .then((response) => {
      dispatch(unsetCurrentUser());
      dispatch(push("/"));
      toast.success("Logout successful.");
    })
    .catch((error) => {
      dispatch(unsetCurrentUser());
      toastOnError(error);
    });
};
