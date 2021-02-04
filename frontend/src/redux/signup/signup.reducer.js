import * as Types from "./signup.types";

const INIAL_STATE = {
  loading: false,
  user: [],
  error: null,
};

const signupReducer = (state = INIAL_STATE, action) => {
  switch (action.type) {
    case Types.SIGNUP_START:
      return {
        ...state,
        loading: true,
      };
    case Types.SIGNUP_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
        error: null,
      };
    case Types.SIGNUP_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    default:
      return state;
  }
};

export default signupReducer;
