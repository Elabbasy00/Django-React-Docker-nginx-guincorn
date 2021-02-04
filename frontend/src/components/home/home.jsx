import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

function Home() {
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
    </Container>
  );
}

export default Home;
