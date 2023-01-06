import React from "react";
import { Row, Col } from "react-bootstrap";
import AdminChatRoomComponent from "../../admin/AdminChatRoomComponent";

const AdminChat = () => {
  return (
    <Row className="m-5">
      <Col md={10}>
        <AdminChatRoomComponent />
      </Col>
    </Row>
  );
};

export default AdminChat;
