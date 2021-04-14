import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { logout } from "../../redux/login/loginSlice";
import { useSelector, useDispatch } from "react-redux";
function Home() {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  return (
    <Container>
      <h1>Home</h1>
      <p>
        <Link to="/login/">Login</Link>
      </p>
      <p>
        <Link to="/signup">Sign up</Link>
      </p>
      <p>
        <Link to="/dashboard">Dashboard</Link>
      </p>
      {isAuth ? (
        <p>
          <Link onClick={() => dispatch(logout())}>logout</Link>
        </p>
      ) : null}
    </Container>
  );
}

export default Home;
