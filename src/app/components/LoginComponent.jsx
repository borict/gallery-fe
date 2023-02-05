import React from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";

export default function LoginComponent({
  handleOnLogin,
  credentials,
  setCredentials,
}) {
  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Form onSubmit={handleOnLogin}>
            <Form.Group controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                required
                value={credentials.email}
                onChange={({ target }) =>
                  setCredentials({ ...credentials, email: target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                required
                value={credentials.password}
                onChange={({ target }) =>
                  setCredentials({ ...credentials, password: target.value })
                }
              />
            </Form.Group>

            <Button variant="outline-dark" type="submit">
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
