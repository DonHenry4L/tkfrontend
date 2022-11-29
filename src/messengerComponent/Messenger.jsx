import React, { useEffect } from "react";
import { FaEllipsisH, FaEdit, FaSistrix } from "react-icons/fa";
import client from "../api/client";
// import { getFriends } from "../api/messenger/messenger";
import { useAuth } from "../hooks";
import { getToken } from "../utils/helper";
import ActiveFriend from "./ActiveFriend";
import Friends from "./Friends";
import RightSide from "./RightSide";

export default function Messenger() {
  // Get Friends
  const { friends, setFriends, authInfo } = useAuth();
  console.log(authInfo);

  const getFriends = async () => {
    const token = getToken();
    const config = {
      headers: {
        authorization: "Bearer " + token,
      },
    };
    const { data } = await client("/get-friends", config);
    setFriends(data.friends);
    console.log(friends);
  };

  useEffect(() => {
    getFriends();
  }, []);

  return (
    <div className="messenger">
      <div className="row">
        <div className="col-3">
          <div className="left-side">
            <div className="top">
              <div className="image-name">
                <div className="image">
                  <img src="/image/20003ariyan.jpg" alt="" />
                </div>
                <div className="name">
                  <h3> HI Ariyan </h3>
                </div>
              </div>

              <div className="icons">
                <div className="icon">
                  <FaEllipsisH />
                </div>
                <div className="icon">
                  <FaEdit />
                </div>
              </div>
            </div>

            <div className="friend-search">
              <div className="search">
                <button>
                  {" "}
                  <FaSistrix />{" "}
                </button>
                <input
                  type="text"
                  placeholder="Search"
                  className="form-control"
                />
              </div>
            </div>
            <div className="active-friends">
              <ActiveFriend />
            </div>
            <div className="friends">
              {friends && friends.length > 0
                ? friends.map((fd, index) => (
                    <div key={index} className="hover-friend active">
                      {" "}
                      <Friends authInfo={fd.authInfo} />
                    </div>
                  ))
                : "No Friend"}
            </div>
          </div>
        </div>
        <RightSide />
      </div>
    </div>
  );
}
