import React from "react";
import { ShareSocial } from "react-share-social";

function ShareSocialNetwork() {
  return (
    <div style={{ marginTop: "-20px", marginBottom: "15px" }}>
      <ShareSocial
        url={window.process && window.location.href}
        socialTypes={["facebook", "twitter", "reddit", "linkedin"]}
        style={{
          height: "100px",
          overflow: "hidden",
          background: "none",
        }}
      />
    </div>
  );
}

export default ShareSocialNetwork;
