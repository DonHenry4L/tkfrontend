import { Button } from "antd";
import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import { useSelector } from "react-redux";
import { BsChatDots, BsXCircle } from "react-icons/bs";
import "../../css/chats.css";
import { useAuth } from "../../hooks";

const UserChat = () => {
  const [openChat, setOpenChat] = useState(false);
  const [socket, setSocket] = useState(false);
  // let chat = [
  //   {"client": "msg"},
  //   {"client": "msg"},
  //   {"admin": "msg"},
  // ]

  const [chat, setChat] = useState([]);
  const [messageReceived, setMessageReceived] = useState(false);
  const [chatConnectionInfo, setChatConnectionInfo] = useState(false);
  const [reconnect, setReconnect] = useState(false);
  const userInfo = useSelector((state) => state.userRegisterLogin.userInfo);
  const { authInfo } = useAuth();

  useEffect(() => {
    if (!authInfo.profile?.isAdmin) {
      setReconnect(false);
      var audio = new Audio("/audio/chat-msg.mp3");
      const socket = socketIOClient();
      socket.on("no admin", (msg) => {
        setChat((chat) => {
          return [
            ...chat,
            {
              admin: (
                <span className=" text-xs font-thin">
                  Hello, support is unavailable at the moment. But will respond
                  shortly
                </span>
              ),
            },
          ];
        });
      });

      socket.on("server sends message from admin to client", (msg) => {
        setChat((chat) => {
          return [...chat, { admin: msg }];
        });
        setMessageReceived(true);
        audio.play();
        const chatMessages = document.querySelector(".cht-msg");
        chatMessages.scrollTop = chatMessages.scrollHeight;
      });
      setSocket(socket);
      socket.on("admin closed chat", () => {
        setChat([]);
        setChatConnectionInfo(
          "Admin closed chat. Type something and submit to reconnect"
        );
        setReconnect(true);
      });
      return () => socket.disconnect();
    }
  }, [authInfo.profile?.isAdmin, reconnect]);

  const clientSubmitChatMsg = (e) => {
    if (e.keyCode && e.keyCode !== 13) {
      return;
    }
    setChatConnectionInfo("");
    setMessageReceived(false);
    const msg = document.getElementById("clientChatMsg");
    let v = msg.value.trim();
    if (v === "" || v === null || v === false || !v) {
      return;
    }
    socket.emit("client sends message", v);
    setChat((chat) => {
      return [...chat, { client: v }];
    });
    msg.focus();
    setTimeout(() => {
      msg.value = "";
      const chatMessages = document.querySelector(".cht-msg");
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 200);
  };

  const handleChatBox = () => {
    openChat ? setOpenChat(false) : setOpenChat(true);
  };
  return !authInfo.profile?.isAdmin ? (
    <>
      <input type="checkbox" id="check" />
      <label className="chat-btn" htmlFor="check">
        {!openChat ? (
          <div>
            <BsChatDots onClick={handleChatBox} />
            {messageReceived && (
              <span className="absolute top-0 flex items-start p-2 bg-red-700 border-2 border-slate-200 rounded-full -translate-y-2.5 -translate-x-3"></span>
            )}
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
            <p>{chatConnectionInfo}</p>
            {chat.map((item, id) => (
              <div key={id}>
                {item.client && (
                  <p>
                    <b>You:</b> {item.client}
                  </p>
                )}
                {item.admin && (
                  <p className="bg-blue-500 p-3 ms-4 text-white rounded-md">
                    <b>Support:</b>
                    {item.admin}
                  </p>
                )}
              </div>
            ))}
          </div>
          <textarea
            onKeyUp={(e) => clientSubmitChatMsg(e)}
            id="clientChatMsg"
            className="form-control"
            placeholder="Your Text Message"
          />

          <Button
            onClick={(e) => clientSubmitChatMsg(e)}
            type="primary"
            className="button-btn"
          >
            Submit
          </Button>
        </div>
      </div>
    </>
  ) : null;
};

export default UserChat;
