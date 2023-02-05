import { Form, Button, Container, Row, Col } from "react-bootstrap";

export default function RegisterComponent({
  handleOnRegister,
  newUser,
  setNewUser,
}) {
  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Form onSubmit={handleOnRegister}>
            <Form.Group controlId="first_name">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                value={newUser.first_name}
                onChange={(e) =>
                  setNewUser({ ...newUser, first_name: e.target.value })
                }
                placeholder="Enter First Name"
                required
              />
            </Form.Group>
            <Form.Group controlId="last_name">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                value={newUser.last_name}
                onChange={(e) =>
                  setNewUser({ ...newUser, last_name: e.target.value })
                }
                placeholder="Enter Last Name"
                required
              />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                value={newUser.email}
                onChange={(e) =>
                  setNewUser({ ...newUser, email: e.target.value })
                }
                placeholder="Enter email"
                required
              />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={newUser.password}
                onChange={(e) =>
                  setNewUser({ ...newUser, password: e.target.value })
                }
                placeholder="Password"
                required
              />
            </Form.Group>
            <Form.Group controlId="confirmed_password">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                value={newUser.confirmed_password}
                onChange={(e) =>
                  setNewUser({ ...newUser, confirmed_password: e.target.value })
                }
                placeholder="Confirm Password"
                required
              />
            </Form.Group>
            <br />
            <br />
            <Form.Check
              type="checkbox"
              label="I accept terms and conditions"
              required
              name="terms"
              value={true}
              onChange={({ target }) =>
                setNewUser({ ...newUser, terms: target.checked })
              }
            />
            <br />
            <br />
            <Button variant="outline-dark" type="submit">
              Register
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
