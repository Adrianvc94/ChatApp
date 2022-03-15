import React, { useRef } from "react";
import { Button, Container, Form } from "react-bootstrap";

const Login = ({ onIdSubmit, setIsLoggedIn }) => {
  const idRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoginState();
    onIdSubmit(idRef.current.value);
  };

  const createNewId = () => {
      const id = Math.floor(Math.random() * (1000 - 1)) + 1;
      setLoginState();
      onIdSubmit(id);
  }

  const setLoginState = () => {
    localStorage.setItem("isLoggedIn", "1")
    setIsLoggedIn("1");
}

  return (
    <Container
      className="align-items-center d-flex"
      style={{ height: "100vh" }}
    >
      <Form onSubmit={handleSubmit} className="w-100">
        <Form.Group>
          <Form.Label style={{ color: "white" }}>Enter an id</Form.Label>
          <Form.Control type="text" ref={idRef} required />
        </Form.Group>
        <Button type="submit" className="m-2">
          Login
        </Button>
        <Button onClick={createNewId} variant="secondary">Create a random Id</Button>
      </Form>
    </Container>
  );
}

export default Login;
