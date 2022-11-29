import React from "react";
import Banner from "../component/Banner";
import AllPost from "../component/user/AllPost";

export default function Home() {
  return (
    <div className="dark:bg-primary bg-white min-h-screen">
      <div>
        <Banner />
        <AllPost />
      </div>
    </div>
  );
}
