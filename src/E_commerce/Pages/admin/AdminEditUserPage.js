import { Row, Col, Container, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Checkbox } from "antd";

const AdminEditUserPage = () => {
  const [validated, setValidated] = useState(false);
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };
  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col md={1}>
          <Link to="/admin/users" className="btn btn-info my-3">
            Go Back
          </Link>
        </Col>
        <Col md={6}>
          <h1>Edit User</h1>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicFirmName">
              <Form.Label className="text-gray-500">First Name</Form.Label>
              <Form.Control
                name="firstname"
                required
                type="text"
                defaultValue="John"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicLastName">
              <Form.Label className="text-gray-500">Last Name</Form.Label>
              <Form.Control
                name="lastname"
                required
                type="text"
                rows={3}
                defaultValue="Doe"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="text-gray-500">Email</Form.Label>
              <Form.Control
                name="email"
                required
                type="email"
                defaultValue="John@gmail.com"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPrice">
              <Checkbox name="isAdmin">Is Admin</Checkbox>
            </Form.Group>

            <Button variant="primary" type="submit">
              Update
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminEditUserPage;
