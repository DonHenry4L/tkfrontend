import { Button } from "antd";
import React, { useState } from "react";
import { BsChatDots, BsXCircle } from "react-icons/bs";
import "../../css/chats.css";

const UserChat = () => {
  const [openChat, setOpenChat] = useState(false);

  const handleChatBox = () => {
    openChat ? setOpenChat(false) : setOpenChat(true);
  };
  return (
    <>
      <input type="checkbox" id="check" />
      <label className="chat-btn" htmlFor="check">
        {!openChat ? (
          <div>
            <BsChatDots onClick={handleChatBox} />
            <span className="absolute top-0 flex items-start p-2 bg-red-700 border-2 border-slate-200 rounded-full -translate-y-2.5 -translate-x-3"></span>
          </div>
        ) : (
          <BsXCircle onClick={handleChatBox} />
        )}
      </label>
      <div className="chat-wrapper">
        <div className="chat-header">
          <h6>Let's Chat - Online</h6>
        </div>

        <div className="chat-form">
          <div className="cht-msg">
            {Array.from({ length: 20 }).map((_, id) => (
              <div key={id}>
                <p>
                  <b>You:</b> Hello, world! This is a toast message
                </p>
                <p className="bg-blue-500 p-3 ms-4 text-white rounded-md">
                  <b>Support:</b> Hello, world! This is a toast message
                </p>
              </div>
            ))}
          </div>
          <textarea
            id="clientChatMsg"
            className="form-control"
            placeholder="Your Text Message"
          />

          <Button type="primary" className="button-btn">
            Submit
          </Button>
        </div>
      </div>
    </>
  );
};

export default UserChat;
