import { UploadOutlined } from "@ant-design/icons";
import { Button, Upload, message } from "antd";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MediaContext } from "../../../context/Media";
import { getToken } from "../../../utils/helper";

export default function UploadFile({
  redirectToLibrary = false,
  page = "admin",
}) {
  const [media, setMedia] = useContext(MediaContext);
  const token = getToken();
  const navigate = useNavigate();

  const props = {
    name: "file",
    action: `http://localhost:8000/upload-image-file`,
    headers: {
      authorization: "Bearer " + token,
    },

    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
        // console.log("info.file => ", info.file);
        setMedia({
          images: [...media.images, info.file.response],
          selected: info.file.response,
          showMediaModal: false,
        });
        if (redirectToLibrary) {
          navigate(`/${page}/media/library`);
        }
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  return (
    <>
      <Upload {...props} maxCount={1}>
        <Button icon={<UploadOutlined />} className="dark:text-white">
          Click to Upload
        </Button>
      </Upload>
    </>
  );
}
