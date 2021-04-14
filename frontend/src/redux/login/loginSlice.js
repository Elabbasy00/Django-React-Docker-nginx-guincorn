import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { toast } from "react-toastify";

import { setAxiosAuthToken, toastOnError } from "../../utiles/Utils";

import axios from "axios";

import { push } from "connected-react-router";

export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ userData, redirectTo }, { dispatch, rejectWithValue }) => {
    try {
      const req = await axios.post("/api/v1/token/login/", userData);
      const { auth_token } = req.data;
      setAxiosAuthToken(auth_token);
      dispatch(authSuccess(auth_token));
      dispatch(getCurrentUser(redirectTo));
      toast.success("Login Success");
    } catch (error) {
      dispatch(unSetCurrentUser());
      toastOnError(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const authSuccess = createAsyncThunk("auth/setToken", async (token) => {
  setAxiosAuthToken(token);
  localStorage.setItem("token", token);
  return token;
});

export const getCurrentUser = createAsyncThunk(
  "auth/getUser",

  async (redirectTo, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.get("/api/v1/users/me/");
      const user = {
        username: response.data.username,
        email: response.data.email,
      };
      dispatch(setCurrentUser({ user, redirectTo }));
    } catch (error) {
      dispatch(logout());
      toastOnError(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const setCurrentUser = createAsyncThunk(
  "auth/setUser",

  async ({ user, redirectTo }, { dispatch }) => {
    localStorage.setItem("user", JSON.stringify(user));

    if (redirectTo !== "") {
      dispatch(push(redirectTo));
    }
    return user;
  }
);

export const unSetCurrentUser = createAsyncThunk(
  "auth/unSetUser",

  async (_, { dispatch }) => {
    setAxiosAuthToken("");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }
);

export const logout = createAsyncThunk(
  "auth/logout",

  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.post("/api/v1/token/logout/");
      dispatch(unSetCurrentUser());
      push("/");
      toast.success("Logout successful.");
    } catch (error) {
      dispatch(unSetCurrentUser());
      toastOnError(error);
      return rejectWithValue(error);
    }
  }
);

const initialState = {
  loading: false,
  error: null,
  user: {},
  isAuthenticated: false,
  token: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: {
    [loginUser.pending]: (state) => {
      state.loading = true;
    },
    [loginUser.fulfilled]: (state) => {
      state.loading = false;
    },
    [loginUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
      state.token = "";
    },
    [authSuccess.fulfilled]: (state, action) => {
      state.token = action.payload;
      state.isAuthenticated = true;
      state.error = null;
      state.loading = false;
    },
    [setCurrentUser.fulfilled]: (state, action) => {
      state.error = null;
      state.loading = false;
      state.user = action.payload;
    },
    [logout.fulfilled]: () => {
      return initialState;
    },
    [unSetCurrentUser.fulfilled]: () => {
      return initialState;
    },
  },
});

export default authSlice.reducer;
