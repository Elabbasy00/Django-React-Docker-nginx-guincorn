import React, { Component } from "react";

import { toast } from "react-toastify";

import axios from "axios";
import { setAxiosAuthToken } from "../../utiles/Utils";
import {
  Container,
  Button,
  Row,
  Col,
  Form,
  FormControl,
} from "react-bootstrap";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      email: "",
      usernameError: "",
      passwordError: "",
      emailError: "",
      status: "",
    };
  }
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSignupClick = () => {
    const userData = {
      username: this.state.username,
      password: this.state.password,
      email: this.state.email,
    };
    this.setState({
      usernameError: "",
      emailError: "",
      passwordError: "",
      status: "",
    });

    setAxiosAuthToken(""); // send request with empty token
    axios
      .post("/api/v1/users/", userData)
      .then((response) => {
        this.setState({ status: "success" });
        toast.success(`Your account created with this email ${userData.email}`);
        this.props.history.push("/login");
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.data.hasOwnProperty("username")) {
            this.setState({ usernameError: error.response.data["username"] });
          }
          if (error.response.data.hasOwnProperty("email")) {
            this.setState({ emailError: error.response.data["email"] });
          }
          if (error.response.data.hasOwnProperty("password")) {
            this.setState({ passwordError: error.response.data["password"] });
          }
          if (error.response.data.hasOwnProperty("detail")) {
            this.setState({ status: "error" });
          }
        } else {
          this.setState({ status: "error" });
        }
      });
  };

  render() {
    return (
      <Container>
        <Row>
          <Col md="6">
            <h1>Sign up</h1>
            <div>
              <Form>
                <Form.Group controlId="usernameId">
                  <Form.Label>User name</Form.Label>
                  <Form.Control
                    isInvalid={this.state.usernameError}
                    type="text"
                    name="username"
                    placeholder="Enter user name"
                    value={this.state.username}
                    onChange={this.onChange}
                  />
                  <FormControl.Feedback type="invalid">
                    {this.state.usernameError}
                  </FormControl.Feedback>
                </Form.Group>

                <Form.Group controlId="emailId">
                  <Form.Label>Your Email</Form.Label>
                  <Form.Control
                    isInvalid={this.state.emailError}
                    type="text"
                    name="email"
                    placeholder="Enter email"
                    value={this.state.email}
                    onChange={this.onChange}
                  />
                  <FormControl.Feedback type="invalid">
                    {this.state.emailError}
                  </FormControl.Feedback>
                </Form.Group>

                <Form.Group controlId="passwordId">
                  <Form.Label>Your password</Form.Label>
                  <Form.Control
                    isInvalid={this.state.passwordError}
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    value={this.password}
                    onChange={this.onChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    {this.state.passwordError}
                  </Form.Control.Feedback>
                </Form.Group>
              </Form>
              <Button color="primary" onClick={this.onSignupClick}>
                Sign up
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Signup;
