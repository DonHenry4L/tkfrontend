import moment from "moment";
import React, { Fragment } from "react";
import { FaRegCheckCircle } from "react-icons/fa";
import { useSelector } from "react-redux";

const Message = ({ message, currentFriend, scrollRef, typingMessage }) => {
  const { myInfo } = useSelector((state) => state.auth);
  return (
    <>
      <div className="message-show">
        {message && message.length > 0 ? (
          message.map((m, index) =>
            m.senderId === myInfo.id ? (
              <div ref={scrollRef} className="my-message">
                <div className="image-message">
                  <div className="my-text">
                    <p
                      className="message-text"
                    >
                      {" "}
                      <div style={{ maxWidth: "300px" }} className="message__text text-white">
                      {m.message.text === "" ? (
                        <img src={`./image/${m.message.image}`} />
                      ) : (
                        m.message.text
                      )}
                      </div>
                      {" "}
                    </p>

                    {index === message.length - 1 &&
                    m.senderId === myInfo.id ? (
                      m.status === "seen" ? (
                        <img
                          className="img"
                          src={`./image/${currentFriend.image}`}
                          alt=""
                        />
                      ) : m.status === "delivered" ? (
                        <span>
                          <FaRegCheckCircle />
                        </span>
                      ) : (
                        <FaRegCheckCircle />
                      )
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <div className="time chat__time">
                  {moment(m.createdAt).startOf("mini").fromNow()}
                </div>
              </div>
            ) : (
              <div ref={scrollRef} className="fd-message">
                <div className="image-message-time">
                  <img src={`./image/${currentFriend.image}`} alt="" />
                  <div className="message-time">
                    <div className="fd-text ">
                      <p className="message-text message__text" style={{ maxWidth: "300px" }}>
                        {" "}
                        {m.message.text === "" ? (
                          <img src={`./image/${m.message.image}`} />
                        ) : (
                          m.message.text
                        )}{" "}
                      </p>
                    </div>
                    <div className="time chat__time">
                      {moment(m.createdAt).startOf("mini").fromNow()}
                    </div>
                  </div>
                </div>
              </div>
            )
          )
        ) : (
          <div className="friend_connect">
            <img src={`./image/${currentFriend.image}`} alt="" />
            <h3>{currentFriend.userName} Connect You</h3>
            <span>
              {moment(currentFriend.createdAt).startOf("mini").fromNow()}
            </span>
          </div>
        )}
      </div>
      {typingMessage &&
      typingMessage.msg &&
      typingMessage.senderId === currentFriend._id ? (
        <div className="typing-message">
          <div className="fd-message">
            <div className="image-message-time">
              <img src={`./image/${currentFriend.image}`} alt="" />
              <div className="message-time">
                <div className="fd-text">
                  <p className="time italic">Typing.... </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Message;
