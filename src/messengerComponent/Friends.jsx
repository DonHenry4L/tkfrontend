import React from "react";
import { useAuth } from "../hooks";

export default function Friends({ friend }) {
  return (
    <div className="friend">
      <div className="friend-image">
        <div className="image">
          <img src={`./image/${friend?.profile?.picture}`} alt="" />
        </div>
      </div>

      <div className="friend-name-seen">
        <div className="friend-name">
          <h4>
            {friend?.profile?.username}
            {/* {friend?.profile?.username} */}
          </h4>
        </div>
      </div>
    </div>
  );
}
