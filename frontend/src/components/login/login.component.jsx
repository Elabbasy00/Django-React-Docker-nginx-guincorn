import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { LoginUser } from "../../redux/login/login.actions";
import { withRouter } from "react-router-dom"; // new import

import {
  Container,
  Button,
  Row,
  Col,
  Form,
  FormControl,
} from "react-bootstrap";
function Login({ LoginUser }) {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onLoginClick = () => {
    const userData = {
      username: user.username,
      password: user.password,
    };
    LoginUser(userData, "/");
  };
  return (
    <Container>
      <Row>
        <Col md="4">
          <h1>Login</h1>
          <Form>
            <Form.Group controlId="usernameId">
              <Form.Label>User name</Form.Label>
              <Form.Control
                type="text"
                name="username"
                placeholder="Enter user name"
                value={user.username}
                onChange={onChange}
              />
              <FormControl.Feedback type="invalid"></FormControl.Feedback>
            </Form.Group>

            <Form.Group controlId="passwordId">
              <Form.Label>Your password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Enter password"
                value={user.password}
                onChange={onChange}
              />
              <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
            </Form.Group>
          </Form>
          <Button color="primary" onClick={onLoginClick}>
            Login
          </Button>
          <p className="mt-2">
            Don't have account? <Link to="/signup">Signup</Link>
          </p>
        </Col>
      </Row>
    </Container>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    LoginUser: (userData, redirectTo) =>
      dispatch(LoginUser(userData, redirectTo)),
  };
};

export default connect(null, mapDispatchToProps)(withRouter(Login));
