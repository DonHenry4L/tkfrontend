import React, { useState, useEffect } from "react";
import { Row, Col, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Button } from "antd";

import { logout } from "../../../redux/actions/userActions";
import { useDispatch } from "react-redux";

const UsersPageComponent = ({ fetchUsers, deleteUser }) => {
  const [users, setUsers] = useState([]);
  const [userDeleted, setUserDeleted] = useState(false);

  const dispatch = useDispatch()

  // Delete user
  const deleteHandler = async (userId) => {
    if (window.confirm("Are you sure you want to delete this User?")) {
      const data = await deleteUser(userId);
      if (data === "user removed") {
        setUserDeleted(!userDeleted);
      }
    }
  };

  useEffect(() => {
    const abctrl = new AbortController();
    fetchUsers(abctrl)
      .then((res) => setUsers(res))
      .catch((err) => {
        // dispatch(logout())
        console.log(
          err.response.data.message
            ? err.response.data.message
            : err.response.data
        );
      });
    return () => abctrl.abort();
  }, [userDeleted]);

  return (
    <Row className="m-5">
      <Col md={10}>
        <h1>Users List</h1>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              {/* <th>Username</th> */}
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Is Admin</th>
              <th>Edit/Delete</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr key={idx}>
                <td>{idx + 1}</td>
                {/* <td>{user.username}</td> */}
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>{user.email}</td>
                <td>
                  {user.role === "Admin" ? (
                    <i className="bi bi-check-lg text-success"></i>
                  ) : (
                    <i className="bi bi-x-lg text-danger"></i>
                  )}
                </td>
                <td>
                  <Link to={`/admin/edit-user/${user._id}`}>
                    <Button type="primary" className="btn-sm">
                      <i className="bi bi-pencil-square"></i>
                    </Button>
                  </Link>
                  {" / "}
                  <Button
                    type="danger"
                    className="btn-sm"
                    onClick={() => deleteHandler(user._id)}
                  >
                    <i className="bi bi-x-circle"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Col>
    </Row>
  );
};

export default UsersPageComponent;
