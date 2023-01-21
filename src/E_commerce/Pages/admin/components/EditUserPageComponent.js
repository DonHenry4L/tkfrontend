import { Row, Col, Container, Form, Button } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Checkbox } from "antd";

const EditUserPageComponent = ({ updateUserApiRequest, fetchUser }) => {
  const [validated, setValidated] = useState(false);
  const [user, setUser] = useState([]);
  const [isAdminState, setIsAdminState] = useState(false);
  const [updateUserResponseState, setUpdateUserResponseState] = useState({
    message: "",
    error: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget.elements;

    const first_name = form.first_name?.value;
    const last_name = form.last_name?.value;
    const email = form.email?.value;
    const role = form.role?.value;
    const isAdmin = form.isAdmin?.checked;
    if (event.currentTarget.checkValidity() === true) {
      updateUserApiRequest(id, first_name, last_name, email, isAdmin, role)
        .then((data) => {
          if (data === "user Updated") {
            navigate("/admin/users");
          }
        })
        .catch((er) => {
          setUpdateUserResponseState({
            message: er.response.data.message
              ? er.response.data.message
              : er.response.data,
          });
        });
    }

    setValidated(true);
  };

  useEffect(() => {
    fetchUser(id)
      .then((data) => {
        setUser(data);
        setIsAdminState(data.isAdmin);
      })
      .catch((er) =>
        console.log(
          er.message.data.message ? er.response.data.message : er.response.data
        )
      );
  }, [id]);
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
                defaultValue={user.first_name}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicLastName">
              <Form.Label className="text-gray-500">Last Name</Form.Label>
              <Form.Control
                name="lastname"
                required
                type="text"
                rows={3}
                defaultValue={user.last_name}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="text-gray-500">Email</Form.Label>
              <Form.Control
                name="email"
                required
                type="email"
                defaultValue={user.email}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicRole">
              <Form.Label className="text-gray-500">Role</Form.Label>
              <Form.Control
                name="role"
                required
                type="text"
                defaultValue={user.role}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPrice">
              <Checkbox
                name="isAdmin"
                checked={isAdminState}
                onChange={(e) => setIsAdminState(e.target.checked)}
              >
                Is Admin
              </Checkbox>
            </Form.Group>

            <Button variant="primary" type="submit">
              Update
            </Button>
            {updateUserResponseState.error}
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default EditUserPageComponent;
