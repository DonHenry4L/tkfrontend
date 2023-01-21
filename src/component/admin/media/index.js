import React from "react";

import { Tabs } from "antd";
import UploadFile from "./UploadFile";
import MediaLibrary from "./MediaLibrary";
import "../../../antdesign/antdist.css";

function Media() {
  return (
    <Tabs
      items={[
        {
          label: "Upload File",
          key: "1",
          children: <UploadFile />,
        },
        {
          label: "Media Library",
          key: "2",
          children: <MediaLibrary />,
        },
      ]}
    />
  );
}

export default Media;
