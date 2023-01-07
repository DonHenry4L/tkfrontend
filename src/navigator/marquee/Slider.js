import React from "react";
import Marquee from "react-fast-marquee";

export default function Slider() {
  return (
    <div className=" bg-slate-400 mb-5">
      <Marquee pauseOnHover speed={50}>
        <p>We're currently working on the website for better future</p>
        <br /> <br />
        ....
        <p>Any update or notification should be uploaded here</p>
      </Marquee>
    </div>
  );
}
