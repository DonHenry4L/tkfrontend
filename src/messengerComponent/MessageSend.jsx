import React from "react";
import {
  FaPlusCircle,
  FaFileImage,
  FaGift,
  FaPaperPlane,
} from "react-icons/fa";

export default function MessageSend() {
  const emojis = [
    "😀",
    "😄",
    "😁",
    "😆",
    "😂",
    "🤣",
    "😊",
    "🙂",
    "🙃",
    "😉",
    "😍",
    "😝",
    "😜",
    "🧐",
    "🤓",
    "😎",
    "😕",
    "🤑",
    "🥴",
    "😱",
  ];

  return (
    <div>
      <div className="message-send-section">
        <input type="checkbox" id="emoji" />
        <div className="file hover-attachment">
          <div className="add-attachment">Add Attachment</div>
          <FaPlusCircle />
        </div>

        <div className="file hover-image">
          <div className="add-image">Add Image</div>
          <label htmlFor="pic">
            {" "}
            <FaFileImage />{" "}
          </label>
        </div>

        <div className="file hover-gift">
          <div className="add-gift">Add gift</div>
          <FaGift />
        </div>

        <div className="message-type">
          <input
            type="text"
            name="message"
            id="message"
            placeholder="Aa"
            className="form-control"
          />

          <div className="file">
            <FaPaperPlane />
          </div>
        </div>

        <div className="hover-gift">
          <label htmlFor="emoji">
            <div className="file">❤</div>
          </label>
        </div>

        <div className="emoji-section">
          <div className="emoji">
            {emojis.map((e, index) => (
              <span key={index}>{e}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
