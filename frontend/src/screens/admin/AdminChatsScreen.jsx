import React from 'react'
import AdminLinksComponent from "../../components/admin/AdminLinksComponent";
import AdminChatRoomComponent from "../../components/admin/AdminChatRoomComponent";
import { Row, Col } from "react-bootstrap";

import { useSelector } from "react-redux";

function AdminChatsScreen() {

const { chatRooms } = useSelector((state) => state.adminChat);
// console.log(chatRooms);

  return (
    <Row className="m-5">
      <Col md={2}>
        <AdminLinksComponent />
      </Col>
      <Col md={10}>
        <Row>
          {Object.entries(chatRooms).map((chatRoom, index) => (
            <AdminChatRoomComponent key={index} chatRoom={chatRoom} />
          ))}
        </Row>
      </Col>
    </Row>
  );
}

export default AdminChatsScreen