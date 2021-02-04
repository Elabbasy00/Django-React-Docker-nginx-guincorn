import * as Types from "./signup.types";
import axios from "axios";
import { toast } from "react-toastify";

export const signupStart = () => {
  return {
    type: Types.SIGNUP_START,
  };
};

export const signupSuccess = (user) => {
  return {
    type: Types.SIGNUP_SUCCESS,
    payload: user,
  };
};

export const signupFail = (error) => {
  return {
    type: Types.SIGNUP_ERROR,
    error: error,
  };
};

export const UserSignUp = (userData) => {
  return (dispatch) => {
    dispatch(signupStart());
    axios
      .post("api/v1/users/", userData)
      .then((res) => {
        toast.success(
          "Account for " +
            userData.username +
            " created successfully. Please login."
        );
        dispatch(signupSuccess(res.data));
      })
      .catch((error) => {
        dispatch(signupFail(error));
        if (error.resposne !== null || undefined) {
          console.log(error.response);
          toast.error(JSON.stringify(error.response.data));
        } else {
          toast.error(JSON.stringify(error.message));
        }
      });
  };
};
