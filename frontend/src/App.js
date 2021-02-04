import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./components/home/home";
import SignUp from "./components/signup/signup.component";
import Login from "./components/login/login.component";
import DashBoard from "./components/dashboard/dashboard.component";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import requireAuth from "./utiles/RequireAuth";

if (window.location.origin === "http://localhost:3000") {
  axios.defaults.baseURL = "http://127.0.0.1:8000";
} else {
  axios.defaults.baseURL = window.location.origin;
}
class App extends Component {
  render() {
    return (
      <>
        <ToastContainer
          hideProgressBar={false}
          newestOnTop={true}
          position="top-center"
        />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/dashboard" component={requireAuth(DashBoard)} />
          <Route path="*">Ups</Route>
        </Switch>
      </>
    );
  }
}

export default App;
