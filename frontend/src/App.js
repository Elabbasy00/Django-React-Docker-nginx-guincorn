import React, { Component } from "react";

import { Redirect, Route, Switch } from "react-router-dom";

import Home from "./components/home/home";

import SignUp from "./components/signup/signup.component";

import Login from "./components/login/login.component";

import DashBoard from "./components/dashboard/dashboard.component";

import { ToastContainer } from "react-toastify";

import { connect } from "react-redux";

import axios from "axios";

import requireAuth from "./utiles/RequireAuth";

if (window.location.origin === "http://localhost:3000") {
  axios.defaults.baseURL = "http://127.0.0.1:8000";
} else {
  axios.defaults.baseURL = window.location.origin;
}
class App extends Component {
  render() {
    const { isAuth } = this.props;
    return (
      <>
        <ToastContainer
          hideProgressBar={false}
          newestOnTop={true}
          position="top-right"
        />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/signup" component={SignUp} />
          <Route
            exact
            path="/login"
            // render={() => (isAuth ? <Redirect to="/" /> : <Login />)}
            component={Login}
          />
          <Route exact path="/dashboard" component={requireAuth(DashBoard)} />
          <Route path="*">Ups</Route>
        </Switch>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.isAuthenticated,
  };
};
export default connect(mapStateToProps)(App);
