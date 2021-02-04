import * as Types from "./login.types";

const INITAL_STATE = {
  loading: false,
  error: null,
  user: {},
  isAuthenticated: false,
  token: "",
};

const authReducer = (state = INITAL_STATE, action) => {
  switch (action.type) {
    case Types.AUTH_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case Types.AUTH_SUCCESS:
      return {
        ...state,
        token: action.token,
        isAuthenticated: true,
        loading: false,
        error: null,
      };
    case Types.AUTH_SET_USER:
      return {
        ...state,
        user: action.user,
        loading: false,
        error: null,
      };
    case Types.AUTH_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        error: action.error,
      };
    case Types.AUTH_LOGOUT:
      return INITAL_STATE;
    default:
      return state;
  }
};

export default authReducer;
