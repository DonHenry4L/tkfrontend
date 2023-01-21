import React from "react";
import { Row, Col } from "react-bootstrap";
import AdminChatRoomComponent from "../../admin/AdminChatRoomComponent";
import { useSelector } from "react-redux";

const AdminChat = () => {
  const { chatRooms, socket } = useSelector((state) => state.adminChat);

  return (
    <Row className="m-5">
      <Col md={2}></Col>
      <Col md={10}>
        <Row>
          {Object.entries(chatRooms).map((chatRoom, index) => (
            <AdminChatRoomComponent
              key={index}
              chatRoom={chatRoom}
              roomIndex={index + 1}
              socket={socket}
              socketUser={chatRoom[0]}
            />
          ))}
        </Row>
      </Col>
    </Row>
  );
};

export default AdminChat;
