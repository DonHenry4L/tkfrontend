import React from "react";
import { Outlet } from "react-router-dom";
import UserChat from "../../user/UserChat";

const RoutesWithUserChatComponent = () => {
  return (
    <>
      <UserChat />
      <Outlet />
    </>
  );
};

export default RoutesWithUserChatComponent;
