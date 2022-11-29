import React from "react";
import Jumbotron from "../cards/Jumbotron";
import NavMenu from "../nav/Menu";

const E_home = () => {
  return (
    <div>
      <div className="mb-4">
        <NavMenu />
      </div>
      <Jumbotron />
    </div>
  );
};

export default E_home;
